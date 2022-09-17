import * as cheerio from 'cheerio'
import { IAnimes, I,  IEpisodesAnime, ISeasonsAnime } from '../@types/AnimesScraper'
import { animeBizExtractor } from '../extractors/animebiz'
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
                if (index == 1) {
                    throw new Error("Gênero não encontrado");
                }

                return
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
        let listLinksEpisodes: IEpisodesAnime[] = [];
        let seaseosFormated: ISeasonsAnime[] = [];

        const $ = cheerio.load(pageAnime)
        const seaseons = $('.content .tempep #seasons .se-c').toArray()
        
        for (const elemSeaons of seaseons){          
            const title = $(elemSeaons).find('.se-q .title').text()

            const listLinksEpisodesElement = $(elemSeaons).find('.se-a .episodios li').toArray()

            for (const linkElem of listLinksEpisodesElement) {
                
                    const linkEpisode = $(linkElem).find('.episodiotitle a').attr('href')

                    let linkEmbed;

                    if ( linkEpisode ) {
                        linkEmbed = await this.getLinkEmbed(linkEpisode)
                    }

                    listLinksEpisodes.push({
                        title: $(linkElem).find('.episodiotitle a').text(),
                        image: $(linkElem).find('.imagen img').attr('src'),
                        date: new Date($(linkElem).find('.date').text()),
                        linkPlayer: linkEmbed
                    })
                
            }

            seaseosFormated.push({
                title,
                episodes: listLinksEpisodes
            })
        }

        console.log(JSON.stringify(seaseosFormated))

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

    async getLinkEmbed(url: string) {
        const data = await fetchOrCache(url)

        if (!data) {
            return
        }
        // const $ = cheerio.load(data)

        const linkPlayer = animeBizExtractor(data)

        return linkPlayer
    }
}
