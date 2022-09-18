import { Request, Response } from 'express'
import AnimeBrBiz from "../../../../scraper/AnimeBrBiz"
import { IEpisodesRepository } from '../../repositores/EpisodesRepository'

export class ListAnimesController {

    constructor(private episodesRepository: IEpisodesRepository) {

    }

    async handle(req: Request, res: Response) {
        const animes = await this.episodesRepository.list()

        return res.status(200).json({
            animes,
            success: true
        })
    }
}
