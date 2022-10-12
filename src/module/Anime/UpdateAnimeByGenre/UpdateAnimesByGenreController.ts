import { Request, Response } from "express";
import { UpdateAnimesByGenreService } from "./UpdateAnimesByGenreService";

export class UpdateAnimesByGenreController {
    async handle(request: Request, response: Response) {
        const { genre, startPage } = request.body
        let pageInit = startPage ? Number(startPage) : 1
        const animesUpdated = []

        while (true) {
            const service = new UpdateAnimesByGenreService()

            const animes = await service.execute(genre, pageInit)

            if ((animes instanceof Error)) {
                return response.status(400).json({
                    message: animes.message,
                    animesUpdate: animesUpdated
                })
            } 

            if (!animes) return response.status(200).json(animesUpdated)

            pageInit++
        }

       
    }
}