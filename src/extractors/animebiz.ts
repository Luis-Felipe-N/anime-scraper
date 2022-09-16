import axios from 'axios'
import cheerio from 'cheerio'
import { JSDOM } from 'jsdom'
import puppeteer from 'puppeteer'
import { fetchOrCache } from '../ultis/fertchOrCache'


export async function animeBizExtractor(data: string) {
    const $ = cheerio.load(data)

    const linkIframe = $('#option-1 > iframe').attr('src')

    if ( linkIframe ){
        const { data: dataIframe } = await axios.get(linkIframe)
        
        const $$ = cheerio.load(dataIframe)

        console.log('Iframe', $$.html())
    }

    return 
}

function eventClickSimulate(element: Element) {
    
    var event = new MouseEvent('click')
    element.dispatchEvent(event)
}