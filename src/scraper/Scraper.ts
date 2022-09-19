import { fetchOrCache } from "../ultis/fertchOrCache"

interface IExtractor {
    (data: string): Promise<{linkEmbed: string, linkPlayer: string} | undefined>
}

export class Scraper {
    async getLinkEmbed(url: string, extractror: IExtractor) {
        const data = await fetchOrCache(url)

        if (!data) {
            return
        }

        const {linkEmbed, linkPlayer} = await extractror(data)

        console.log(linkEmbed)

        return {linkEmbed, linkPlayer}
    }
}