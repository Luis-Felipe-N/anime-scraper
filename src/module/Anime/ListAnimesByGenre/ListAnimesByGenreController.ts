import { Request, Response } from "express";
import { ListAnimesByGenreService } from "./ListAnimesByGenreService";

export class ListAnimesByGenreController {
    async handle(request: Request, response: Response)  {
        const { genre } = request.body

        if (!genre) response.status(400).json({message: "Gênero não informado"})

        const serviceAnime = new ListAnimesByGenreService()

        const animes = serviceAnime.execute(genre)

        if (animes instanceof Error) return response.status(400).json({
            status: 404,
            message: animes.message
        })

        return response.status(200).json({animes})
    }
}