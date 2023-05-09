import { Request, Response } from "express";
import { ListAnimesByGenreService } from "./ListAnimesByGenreService";

export class ListAnimesByGenreController {
    async handle(request: Request, response: Response)  {
        const { genreSlug } = request.params
        const query = request

        if (!genreSlug) response.status(400).json({message: "Gênero não informado"})

        const serviceAnime = new ListAnimesByGenreService()

        const animes = await serviceAnime.execute(genreSlug, query)

        if (animes instanceof Error) return response.status(400).json({
            message: animes.message
        })

        return response.status(200).json({animes})
    }
}