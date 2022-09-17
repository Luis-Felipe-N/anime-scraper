import cheerio from 'cheerio'

export function animeBizExtractor(data: string) {
    const $ = cheerio.load(data)
    const linkIframe = $('#option-1 > iframe').attr('src')
    // let urlPlayer

    // if ( linkIframe ){
    //     const dataIframe = await fetchOrCache(linkIframe)

    //     if (dataIframe) {
    //         const $$ = cheerio.load(dataIframe)

    //         const videoConfig = $$('head > script:nth-child(2)').text()

    //         console.log(videoConfig)

    //         urlPlayer = extractorUrlFromString(videoConfig)
    //     }
    // }
    // console.log(urlPlayer)

    return linkIframe
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


