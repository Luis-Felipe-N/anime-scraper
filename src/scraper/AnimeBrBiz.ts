import axios from 'axios'
import * as cheerio from 'cheerio'

const GENRE_LIST = ['acao', 'artes-marciais', 'aventura', 'comedia']
const BASE_URL = 'https://animesonline.cc/'

export default class AnimeBrBiz {

    async getScraper(genreList = GENRE_LIST) {
        const pages = genreList.map(async (genre) => {
            const page = await this.getPageByGenre(genre)

            return page
        })
    }

    async getPageByGenre(genre: string) {
        const { data } = await axios.get(`${BASE_URL}/genero/${genre}`)

        const $ = cheerio.load(data)
        $('.items article').toArray().forEach(async (elem) => {
            const banner = {
                src: $(elem).find('img').attr('src'),
                alt: $(elem).find('img').attr('alt')
            }
            const rating = $(elem).find('.rating').text()
            const title = $(elem).find('.data a').text()
            const animeSlug = $(elem).find('.data a').attr('href')!.split('/').slice(4, 5)[0]

            const data = await this.getAnimeBySlug(animeSlug)
            
            const anime = {
                banner,
                rating,
                title,
                animeSlug,
                // ...datas
            }

            // console.log(anime)
        })

        return $('.items article')
    }

    async getAnimeBySlug(slug: string): Promise<any> {
        const { data } = await axios.get(`${BASE_URL}/anime/${slug}`)

        const $ = cheerio.load(data)
        console.log($('.content .tempep').html())

        return $('.content')
    }
}
