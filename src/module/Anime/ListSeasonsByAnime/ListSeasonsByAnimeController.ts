import { Request, Response } from "express";
import { ListSeasonsByAnimeService } from "./ListSeasonsByAnimeService";

export class ListSeasonsByAnimeController {
    async handle(request: Request, response: Response) {
        const { slug: animeSlug } = request.params

        if (!animeSlug) return response.status(400).json({message: "AnimeSlug é obrigatório"})

        const seasonService = new ListSeasonsByAnimeService()

        const seasons = await seasonService.execute(animeSlug)

        if ( seasons instanceof Error ) return response.status(400).json({message: seasons.message})

        return response.status(200).json({
            seasons
        })
    }
}