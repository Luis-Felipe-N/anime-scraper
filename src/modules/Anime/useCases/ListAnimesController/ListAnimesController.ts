import { Request, Response } from 'express'
import AnimeBrBiz from "../../../../scraper/AnimeBrBiz"

export class ListAnimesController {
    async handle(req: Request, res: Response) {
        const animeBrBiz = new AnimeBrBiz()
        console.log('teste')

        const animes = await animeBrBiz.getScraper(['shounen'])
        return res.status(200).json({
            animes,
            success: true
        })
    }
}
