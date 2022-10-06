import { Request, Response } from "express";
import { ListAnimePopularService } from "./ListAnimePopularService";

export class ListAnimePopularController {
    async handle(request: Request, response: Response) {
        const service = new ListAnimePopularService()

        const animes = await service.execute()

        response.status(200).json({animes})
    }
}