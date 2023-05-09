import { Request, Response } from "express";
import { ListEpisodeByIDsService } from "./ListEpisodeByIDsService";

export class ListEpisodeByIDsController {
    async handle(request: Request, response: Response) {
        const { episodeIDs } = request.body

        if (!episodeIDs) return response.status(400).json({message: "episodeIDs é obrigatório"})

        const episodeService = new ListEpisodeByIDsService()

        const episodes = await episodeService.execute(episodeIDs)

        return response.status(200).json({
            ...episodes
        })
    }
}