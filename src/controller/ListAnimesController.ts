import { Request, Response } from "express";
import { Anime } from "../entities";
import { ListAnimesService } from "../services/ListAnimesService";

export class ListAnimesController {
    async handle(request: Request, response: Response): Promise<Anime[]> {
        const service = new ListAnimesService()

        const animes = service.execute()

        return animes
    }
}