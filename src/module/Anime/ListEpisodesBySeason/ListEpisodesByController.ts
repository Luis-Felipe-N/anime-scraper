import { Request, Response } from "express";
import { ListEpisodesBySeason } from "./ListEpisodesBySeasonService";

export class ListEpisodesByController {
    async handle(request: Request, response: Response) {
        const { seasonId } = request.params

        if(!seasonId) return response.status(400).json({message: "SeasonId é obrigatório"})

        const seasonService = new ListEpisodesBySeason()

        const episodes = await seasonService.execute(seasonId)

        if (episodes instanceof Error) return response.status(400).json({message: episodes.message})

        return response.status(200).json({
            episodes
        })
    }

}