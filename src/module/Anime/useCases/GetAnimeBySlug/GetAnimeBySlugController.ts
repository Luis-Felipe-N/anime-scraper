import { Request, Response } from "express";
import { GetAnimeBySlugService } from "./GetAnimeBySlugService";

export class GetAnimeBySlugController {
    async handle(request: Request, response: Response) {
        const { slug } = request.params

        const service = new GetAnimeBySlugService()

        const anime = await service.execute(slug)

        if (anime instanceof Error) return response.status(400).json({message: anime.message})

        return response.status(200).json({
            anime
        })
    }
}