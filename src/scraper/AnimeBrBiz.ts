import * as cheerio from 'cheerio'
import { IAnimes, IEpisodesAnime, ISeasonsAnime } from '../@types/AnimesScraper'
import { animeBizExtractor } from '../extractors/animebiz'
import { fetchOrCache } from '../ultis/fertchOrCache'
import { slugify } from '../ultis/slugify'
import { Scraper } from './Scraper'

const GENRE_LIST = ['acao', 'artes-marciais', 'aventura', 'comedia', 'shounen']
const BASE_URL = 'https://animesonline.cc'

export default class AnimeBrBiz extends Scraper {

    async getScraper(genreList = GENRE_LIST) {
        let allAnimes: IAnimes[] = [];
        for (const genre of genreList) {
            const animesByGenre = await this.getAnimesByGenre(genre)

            allAnimes.push(...animesByGenre)
        }

        return allAnimes
    }

    async getAnimesByGenre(genre: string, startPage = 1) {
        let animesResult: IAnimes[] = []
        const baseURLGenre = `${BASE_URL}/genero/${genre}`

        let hasNextPage = true
        let numberPage = startPage

        for (let index = 0; index < 9999999; index++) {
            const url = baseURLGenre + `/page/` + (numberPage + index)
            console.log(url)
            const data = await fetchOrCache(url)
            
            if (!data) {                            
                if (index < 1) {
                    throw new Error(`Gênero ${genre} não encontrado`);
                }

                hasNextPage = false
                return animesResult
            }
            
            const $ = cheerio.load(data)

            const pagesAnime = $('.items article').toArray()

            for (const elem of pagesAnime) {
                const animeByGenre = await this.getAnimeBySlug(elem)

                animesResult.push(animeByGenre)
            }            
        };

        return animesResult
    }

    async getAnimeBySlug(html: cheerio.Element) {

        const $ = cheerio.load(html)

        const cover = $('img').attr('src')
        const rating = $('.rating').text()
        const title = $('.data a').text()
        const animeSlug = $('.data a').attr('href')!.split('/').slice(4, 5)[0]

        const pageAnime = await this.getPageAnimeBySlug(animeSlug)

        if (!pageAnime) return

        const seasonsAnime: ISeasonsAnime[] = await this.getSeasonsByAnimeSlug(pageAnime, animeSlug)
        const infosAnime = this.getInfoAnimeBySlug(pageAnime)

        const animeByGenre: IAnimes = {
            title,
            slug: animeSlug,
            cover,
            rating: Number(rating),
            seasons: seasonsAnime,
            ...infosAnime
        }

        return animeByGenre
    }

    async getPageAnimeBySlug(slug: string) {
        const url = `${BASE_URL}/anime/${slug}`
        const data = await fetchOrCache(url)

        return data
    }

    async getSeasonsByAnimeSlug(pageAnime: string, animeSlug: string){
        let episodesFormated: IEpisodesAnime[] = [];
        let seasosFormated: ISeasonsAnime[] = [];

        const $ = cheerio.load(pageAnime)
        const seaseons = $('.content .tempep #seasons .se-c').toArray()
        
        for (const elemSeaons of seaseons){          
            const title = $(elemSeaons).find('.se-q .title').text()

            const seasonId = slugify(title.concat(animeSlug))

            const listLinksEpisodesElement = $(elemSeaons).find('.se-a .episodios li').toArray()

            for (const linkElem of listLinksEpisodesElement) {
                    let linkEmbed;
                
                    const linkEpisode = $(linkElem).find('.episodiotitle a').attr('href')
                    const titleEpisode = $(linkElem).find('.episodiotitle a').text()
                    const idEpisode = slugify(titleEpisode.concat('-', seasonId))

                    if ( linkEpisode ) {
                        let { linkEmbed, linkPlayer } = await this.getLinkEmbed(linkEpisode, animeBizExtractor)

                        episodesFormated.push({
                            id: idEpisode,
                            title: titleEpisode,
                            image: $(linkElem).find('.imagen img').attr('src'),
                            uploaded_at: new Date($(linkElem).find('.date').text()),
                            linkEmbed: linkEmbed,
                            linkPlayer: linkPlayer,
                            duration: linkPlayer ? Number(new URL(linkPlayer).searchParams.get('dur')) : 0,
                        })
                    } else {
                        episodesFormated.push({
                            id: idEpisode,
                            title: titleEpisode,
                            image: $(linkElem).find('.imagen img').attr('src'),
                            uploaded_at: new Date($(linkElem).find('.date').text()),
                            linkEmbed: linkEmbed,
                            linkPlayer: null,
                            duration: 0,
                        })
                    }                
            }

            seasosFormated.push({
                id: seasonId,
                title,
                episodes: episodesFormated
            })
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
}
