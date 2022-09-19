import { Request, Response } from "express";
import { UploadAnimesByGenreService } from "../services/UploadAnimesByGenreService";

export class UploadAnimesByGenreController {
    async handle(request: Request, response: Response) {
        const { genre } = request.body
        console.log(genre)
        const service = new UploadAnimesByGenreService()

        const anime = service.execute(genre)
    }
}