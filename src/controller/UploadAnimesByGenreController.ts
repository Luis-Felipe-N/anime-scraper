import { Request, Response } from "express";
import { UploadAnimesByGenreService } from "../services/UploadAnimesByGenreService";

export class UploadAnimesByGenreController {
    async handle(request: Request, response: Response) {
        const { genre } = request.body

        const service = new UploadAnimesByGenreService()

        const animes = await service.execute(genre)

        response.status(200).json(animes)
    }
}