import { Request, Response } from "express";
import { ListEpisodeService } from "./ListEpisodeService";

export class ListEpisodeController {
    async handle(request: Request, response: Response) {
        const { episodeId } = request.params

        if (!episodeId) return response.status(400).json({message: "episodeId é obrigatório"})

        const episodeService = new ListEpisodeService()

        const episode = await episodeService.execute(episodeId)

        return response.status(200).json({
            ...episode
        })
    }
}