import axios from 'axios'
import * as cheerio from 'cheerio'

const GENRE_LIST = ['acao', 'artes-marciais', 'aventura', 'comedia']
const BASE_URL = 'https://animesbr.biz/'

export default class AnimeBrBiz {

    async getScraper(genreList = GENRE_LIST) {
        const pages = genreList.map(async (genre) => {
            const page = await this.getPageByGenre(genre)

            return page
        })
        console.log(pages)
    }

    async getPageByGenre(genre: string) {
        const { data } = await axios.get(`${BASE_URL}/genero/${genre}`)

        const $ = cheerio.load(data)
        $('.items article').toArray().forEach(i => {
            console.log('ANIME ========')
            console.log($(i).html())
        })

        return $('.items article')
    }
}
