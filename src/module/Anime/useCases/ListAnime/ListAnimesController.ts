import { Request, Response } from "express";
import { ListAnimesService } from "./ListAnimesService";

export class ListAnimesController {
    async handle(request: Request, response: Response) {
        const { take = 10, skip = 0, keyword = '' } = request.query
        const service = new ListAnimesService()

        const animesQs = await service.execute({ take, skip, keyword})

        response.status(200).json({...animesQs})
    }
}