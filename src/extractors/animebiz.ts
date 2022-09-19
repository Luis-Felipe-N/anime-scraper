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

// export async function animeBizExtractor(data: string) {
//     const $ = cheerio.load(data)
//     const linkIframe = $('#option-1 > iframe').attr('src')
//     let urlPlayer

//     process.setMaxListeners(Infinity)

//     if ( linkIframe ){
//         const browser = await puppeteer.launch()
//         const page = await browser.newPage()
//         await page.goto(linkIframe);
//         await page.click('#videocontainer > div.play-button')
//         // await page.waitForSelector('#movie_player > div.html5-video-container > video')
        
//         await browser.close()
        
//     }

//     return urlPlayer
// }

function extractorUrlFromString(str: string) {
    const indexStartStrem = str.replace('var VIDEO_CONFIG = ', '')

    const obj = JSON.parse(indexStartStrem)
    const streamsLength = obj.streams.length
    const url = obj.streams[streamsLength - 1].play_url

    return url
}   


