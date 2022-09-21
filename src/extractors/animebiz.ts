import cheerio from 'cheerio'
import { fetchOrCache } from '../ultis/fertchOrCache'

export async function animeBizExtractor(data: string) {
    const $ = cheerio.load(data)
    const linkEmbed = $('#option-1 > iframe').attr('src')
    let linkPlayer

    if ( linkEmbed ){
        const dataIframe = await fetchOrCache(linkEmbed)

        if (dataIframe) {
            const $$ = cheerio.load(dataIframe)

            const videoConfig = $$('head > script:nth-child(2)').text()

            linkPlayer = extractorUrlFromString(videoConfig)
        }
    }

    return {linkEmbed, linkPlayer}
}
function extractorUrlFromString(str: string) {
    const indexStartStrem = str.replace('var VIDEO_CONFIG = ', '')

    const obj = JSON.parse(indexStartStrem)
    const streamsLength = obj.streams.length
    const url = obj.streams[streamsLength - 1].play_url

    return url
}   


