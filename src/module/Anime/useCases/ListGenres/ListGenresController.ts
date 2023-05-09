import { Request, Response } from "express";
import { ListGenresService } from "./ListGenresService";

export class ListGenresController {
    async handle(request: Request, response: Response) {
        const service = new ListGenresService()

        const genres = await service.execute()

        return response.status(200).json({genres})
    }
}