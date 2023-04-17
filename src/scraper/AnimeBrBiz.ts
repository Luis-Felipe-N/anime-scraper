import axios from 'axios'
import * as cheerio from 'cheerio'
import { json } from 'stream/consumers'
import { IAnimes, IEpisodesAnime, ISeasonsAnime } from '../@types/AnimesScraper'
import { animeBizExtractor } from '../extractors/animebiz'
import { fetchOrCache } from '../ultis/fertchOrCache'
import { slugify } from '../ultis/slugify'
import { Scraper } from './Scraper'

const GENRE_LIST = ['acao', 'artes-marciais', 'aventura', 'comedia', 'shounen']
const BASE_URL = 'https://animesonlinecc.to/'

interface IMoreInfos {
    status?: string,
    youtubeVideoId?: string,
    cover?: string,
    post?: string
}

export default class AnimeBrBiz extends Scraper {

    async getScraper(genreList = GENRE_LIST) {
        let allAnimes: IAnimes[] = [];
        for (const genre of genreList) {
            const animesByGenre = await this.getAnimesByGenre(genre)

            allAnimes.push(...animesByGenre)
        }

        return allAnimes
    }

    async getAnimesByGenre(genre: string, numberPage = 1) {
        let animesResult: IAnimes[] = []
        const baseURLGenre = `${BASE_URL}/genero/${genre}`

        const url = baseURLGenre + `/page/` + (numberPage)
        
        const data = await fetchOrCache(url)

            
        if (!data) {                            
            if (numberPage == 1) {
                throw new Error(`Gênero ${genre} não encontrado`);
            }

            return animesResult
        }
        
        const $ = cheerio.load(data)

        const pagesAnime = $('.items article').toArray()

        for (const elem of pagesAnime) {
            const animeByGenre = await this.getAnimeBySlug(elem)

            animesResult.push(animeByGenre)
        }            

        return animesResult
    }

    async getAnimeBySlug(html: cheerio.Element) {

        const $ = cheerio.load(html)

        const post = $('img').attr('src')
        const rating = $('.rating').text()
        const title = $('.data a').text()
        const animeSlug = $('.data a').attr('href')!.split('/').slice(4, 5)[0]

        const pageAnime = await this.getPageAnimeBySlug(animeSlug)

        if (!pageAnime) return

        const moreInfosAnime = await this.getMoreInfoFromKitsu(animeSlug)
        
        const seasonsAnime: ISeasonsAnime[] = await this.getSeasonsByAnimeSlug(pageAnime, animeSlug)
        const descriptionAndGenresAnime = this.getInfoAnimeBySlug(pageAnime)

        const animeByGenre: IAnimes = {
            title,
            slug: animeSlug,
            post,
            rating: Number(rating),
            seasons: seasonsAnime,
            ...descriptionAndGenresAnime,
            ...moreInfosAnime
        }

        return animeByGenre
    }

    async getPageAnimeBySlug(slug: string) {
        const url = `${BASE_URL}/anime/${slug}`
        const data = await fetchOrCache(url)

        return data
    }

    async getSeasonsByAnimeSlug(pageAnime: string, animeSlug: string){
        let seasosFormated: ISeasonsAnime[] = [];
        
        const $ = cheerio.load(pageAnime)
        const seaseons = $('.content .tempep #seasons .se-c').toArray()
        
        for (const elemSeaons of seaseons){          
            const title = $(elemSeaons).find('.se-q .title').text()
            let episodesFormated: IEpisodesAnime[] = [];
            
            const seasonId = slugify(title.concat(animeSlug))
            
            const listLinksEpisodesElement = $(elemSeaons).find('.se-a .episodios li').toArray()

            for (const linkElem of listLinksEpisodesElement) {
                
                const linkEpisode = $(linkElem).find('.episodiotitle a').attr('href')
                const uploadedAt = $(linkElem).find('.date').text() || new Date().toDateString()
                const titleEpisode = $(linkElem).find('.episodiotitle a').text()
                
                const episodeId = slugify(titleEpisode.concat('-', seasonId, '-', String(Date.parse(uploadedAt))))
               
                const links = await this.getLinkEmbed(linkEpisode, animeBizExtractor)

                if (!links) return

                if (!episodesFormated.find(episode => episode.id == episodeId)) {
                    episodesFormated.push({
                        id: episodeId,
                        title: titleEpisode,
                        image: $(linkElem).find('.imagen img').attr('src'),
                        uploaded_at: new Date(uploadedAt),
                        linkEmbed: links.linkEmbed || null,
                        linkPlayer: links?.linkPlayer || null,
                        duration: links?.linkPlayer ? Number(new URL(links?.linkPlayer).searchParams.get('dur')) : 0,
                    })
                }
            }

            episodesFormated.forEach(ep => console.log(ep.id))

            if (!seasosFormated.find(season => season.id === seasonId)) {
                seasosFormated.push({
                    id: seasonId,
                    title,
                    episodes: episodesFormated
                })
            }
        }

        return seasosFormated
    }

    getInfoAnimeBySlug(pageAnime: string) {
        const $ = cheerio.load(pageAnime)

        const description = $('.content .resumotemp').text()
        const genres = $('.content .sgeneros a').toArray().map(elem => {
            const name = $(elem).text()
            const slug = $(elem).attr('href')!.split('/').slice(4, 5)[0]

            return {
                name,
                slug
            }
        })

        return {
            description,
            genres
        }
    }

    async getMoreInfoFromKitsu(slug: string): Promise<IMoreInfos | undefined> {
        const { data } = await axios.get(`https://kitsu.io/api/edge/anime?filter[slug]=${slug}&page[limit]=1`)

        const dataAnime = data.data[0]?.attributes

        if (!dataAnime) {
            return 
        }

        const moreInfoAnime = {
            status: dataAnime.status,
            youtubeVideoId: dataAnime?.youtubeVideoId,
            cover: dataAnime.coverImage?.original,
            post: dataAnime.posterImage?.original
        }

        return moreInfoAnime
    }
}

