import { Request, Response } from "express";
import { ListAnimeBySlugService } from "../services/ListAnimeBySlugService";

export class ListAnimeBySlugController {
    async handle(request: Request, response: Response) {
        const { slug } = request.params

        const service = new ListAnimeBySlugService()

        const anime = await service.execute(slug)

        if (anime instanceof Error) return response.status(400).json({message: anime.message})

        return response.status(200).json({
            anime
        })
    }
}