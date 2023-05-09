import { Request, Response } from "express";
import { ListEpisodeService } from "./ListEpisodeService";

export class ListEpisodeController {
    async handle(request: Request, response: Response) {
        const { episodeIDs } = request.body

        if (!episodeIDs) return response.status(400).json({message: "episodeIDs é obrigatório"})

        const episodeService = new ListEpisodeService()

        const episodes = await episodeService.execute(episodeIDs)
        console.log(episodes)

        return response.status(200).json({
            ...episodes
        })
    }
}