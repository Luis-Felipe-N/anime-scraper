import { Request, Response } from "express";
import { ListAnimesService } from "./ListAnimesService";

export class ListAnimesController {
    async handle(request: Request, response: Response) {
        const service = new ListAnimesService()

        const animes = await service.execute()

        response.status(200).json({animes})
    }
}