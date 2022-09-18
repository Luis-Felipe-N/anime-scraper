import { fetchOrCache } from "../ultis/fertchOrCache"

interface IExtractor {
    (data: string): Promise<string | undefined>
}

export class Scraper {
    async getLinkEmbed(url: string, extractror: IExtractor) {
        const data = await fetchOrCache(url)

        if (!data) {
            return
        }

        const linkPlayer = extractror(data)

        console.log(linkPlayer)

        return linkPlayer
    }
}