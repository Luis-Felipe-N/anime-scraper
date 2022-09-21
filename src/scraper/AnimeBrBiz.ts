import * as cheerio from 'cheerio'
import { IAnimes, IEpisodesAnime, ISeasonsAnime } from '../@types/AnimesScraper'
import { animeBizExtractor } from '../extractors/animebiz'
import { fetchOrCache } from '../ultis/fertchOrCache'
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
        do {
            const url = baseURLGenre + `/page/` + numberPage
            const data = await fetchOrCache(url)
            
            if (!data) {                            
                if (numberPage == startPage) {
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

            numberPage += 1
        } while (hasNextPage);

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

        const seasonsAnime: ISeasonsAnime[] = await this.getSeasonsByAnimeSlug(pageAnime)
        const infosAnime = this.getInfoAnimeBySlug(pageAnime)

        const animeByGenre: IAnimes = {
            title,
            slug: animeSlug,
            cover,
            rating: Math.round(Number(rating)),
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

    async getSeasonsByAnimeSlug(pageAnime: string){
        let episodesFormated: IEpisodesAnime[] = [];
        let seasosFormated: ISeasonsAnime[] = [];

        const $ = cheerio.load(pageAnime)
        const seaseons = $('.content .tempep #seasons .se-c').toArray()
        
        for (const elemSeaons of seaseons){          
            const title = $(elemSeaons).find('.se-q .title').text()

            const listLinksEpisodesElement = $(elemSeaons).find('.se-a .episodios li').toArray()

            for (const linkElem of listLinksEpisodesElement) {
                    let linkEmbed, linkPlayer;
                
                    const linkEpisode = $(linkElem).find('.episodiotitle a').attr('href')

                    if ( linkEpisode ) {
                        const links = await this.getLinkEmbed(linkEpisode, animeBizExtractor)
                        linkEmbed = links.linkEmbed
                        linkPlayer = links.linkPlayer
                    }

                    episodesFormated.push({
                        title: $(linkElem).find('.episodiotitle a').text(),
                        image: $(linkElem).find('.imagen img').attr('src'),
                        uploaded_at: new Date($(linkElem).find('.date').text()),
                        linkEmbed: linkEmbed,
                        linkPlayer: linkPlayer,
                        duration: 0,
                    })
                
            }

            seasosFormated.push({
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
