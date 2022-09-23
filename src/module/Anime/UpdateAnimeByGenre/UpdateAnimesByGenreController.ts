import { Request, Response } from "express";
import { UpdateAnimesByGenreService } from "./UpdateAnimesByGenreService";

export class UpdateAnimesByGenreController {
    async handle(request: Request, response: Response) {
        const { genre, startPage } = request.body

        const service = new UpdateAnimesByGenreService()

        const animes = await service.execute(genre, startPage ? Number(startPage) : 1)

        if ((animes instanceof Error)) return response.status(400).json({message: animes.message})

        return response.status(200).json(animes)
    }
}