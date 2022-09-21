import { Request, Response } from "express";
import { IAnimes } from "../@types/AnimesScraper";
import { UploadAnimesByGenreService } from "../services/UploadAnimesByGenreService";

export class UploadAnimesByGenreController {
    async handle(request: Request, response: Response) {
        const { genre, startPage } = request.body

        const service = new UploadAnimesByGenreService()

        const animes = await service.execute(genre, startPage)

        if ((animes instanceof Error)) return response.status(400).json({message: animes.message})

        return response.status(200).json(animes)
    }
}