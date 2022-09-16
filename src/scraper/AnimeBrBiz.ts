import * as cheerio from 'cheerio'
import { IAnimes, I,  IEpisodesAnime, ISeasonsAnime } from '../@types/AnimesScraper'
import { fetchOrCache } from '../ultis/fertchOrCache'

const GENRE_LIST = ['acao', 'artes-marciais', 'aventura', 'comedia']
const BASE_URL = 'https://animesonline.cc'

export default class AnimeBrBiz {

    async getScraper(genreList = GENRE_LIST) {
        const pages = genreList.map(async (genre) => {
            const page = await this.getPageByGenre(genre)

            return page
        })
    }

    async getPageByGenre(genre: string, pageStart = 14) {
        let animesResult: IAnimes[] = []
        const baseURLGenre = `${BASE_URL}/genero/${genre}`
        
        for (let index = pageStart; index < 9999; index++) {
            console.log('Scraper na página ', index)
            const url = baseURLGenre + `/page/` + index
            const data = await fetchOrCache(url)

            if (!data) {
                return animesResult
            }

            const $ = cheerio.load(data)

            const pagesAnime = $('.items article').toArray()

            for (const elem of pagesAnime) {
                const banner = {
                    src: $(elem).find('img').attr('src'),
                    alt: $(elem).find('img').attr('alt')
                }
                const rating = $(elem).find('.rating').text()
                const title = $(elem).find('.data a').text()
                const animeSlug = $(elem).find('.data a').attr('href')!.split('/').slice(4, 5)[0]

                const pageAnime = await this.getPageAnimeBySlug(animeSlug)

                if (!pageAnime) return

                const seasonsAnime: ISeasonsAnime[] = await this.getSeasonsByAnimeSlug(pageAnime)
                const infosAnime = this.getInfoAnimeBySlug(pageAnime)

                const animeByGenre: IAnimes = {
                    title,
                    slug: animeSlug,
                    banner,
                    rating: Number(rating),
                    seasons: seasonsAnime,
                    ...infosAnime
                }

                animesResult.push(animeByGenre)
            }
        }

        return animesResult
    }

    async getPageAnimeBySlug(slug: string) {
        const url = `${BASE_URL}/anime/${slug}`
        const data = await fetchOrCache(url)


        return data
    }

    async getSeasonsByAnimeSlug(pageAnime: string){
        const $ = cheerio.load(pageAnime)
        const seaseons = $('.content .tempep #seasons .se-c').toArray()
        const seaseosFormated = seaseons.map(elem => {
            const title = $(elem).find('.se-q .title').text()

            const listLinksEpisodes: IEpisodesAnime[] = $(elem).find('.se-a .episodios li').toArray().map(elemEpisode => {
                const titleEpisode = $(elemEpisode).find('.episodiotitle a').text()
                const linkEpisode = $(elemEpisode).find('.episodiotitle a').attr('href')
                const dateEpisode = $(elemEpisode).find('.date').text()
                const imageEpisode = $(elemEpisode).find('.imagen img').attr('src')

                let episodesInfons;

                if ( linkEpisode ) {
                    this.getDescriptionAndPlayerAnime(linkEpisode)
                }
                

                return {
                    title: titleEpisode,
                    image: imageEpisode,
                    date: new Date(dateEpisode),
                    link: linkEpisode
                }
            })


            return {
                title,
                episodes: listLinksEpisodes
            }
        })
        return seaseosFormated
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

    async getDescriptionAndPlayerAnime(url: string) {
        const data = await fetchOrCache(url)

        if (!data) {
            return
        }
        const $ = cheerio.load(data)

        const description = $('#info').text()
        const linkPlayer = $('video.video-stream.html5-main-video').attr('src')
        console.log('PLAYER')
        console.log(linkPlayer)
    }
}
