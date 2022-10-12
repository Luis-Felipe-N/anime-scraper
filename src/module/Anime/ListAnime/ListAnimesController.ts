import { Request, Response } from "express";
import { ListAnimesService } from "./ListAnimesService";

export class ListAnimesController {
    async handle(request: Request, response: Response) {
        const {query} = request
        console.log(query)
        const service = new ListAnimesService()

        const animesQs = await service.execute(query)

        response.status(200).json({...animesQs})
    }
}