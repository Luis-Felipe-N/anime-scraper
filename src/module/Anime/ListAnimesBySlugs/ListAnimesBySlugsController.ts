import { Request, Response } from "express";
import { ListAnimesBySlugsService } from "./ListAnimesBySlugsService";

export class ListAnimesBySlugsController {
    async handle(request: Request, response: Response) {
        const { animesSlug } = request.body

        const service = new ListAnimesBySlugsService()

        const animes = await service.execute(animesSlug)

        if (animes instanceof Error) return response.status(400).json({message: animes.message})

        return response.status(200).json({
            animes
        })
    }
}