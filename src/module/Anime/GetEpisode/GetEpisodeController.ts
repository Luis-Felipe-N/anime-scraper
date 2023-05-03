import { Request, Response } from "express";
import { GetEpisodeService } from "./GetEpisodeService";

export class GetEpisodeController {
    async handle(request: Request, response: Response) {
        const { episodeId } = request.params

        if (!episodeId) return response.status(400).json({message: "episodeId é obrigatório"})

        const episodeService = new GetEpisodeService()

        const episode = await episodeService.execute(episodeId)

        return response.status(200).json({
            ...episode
        })
    }
}