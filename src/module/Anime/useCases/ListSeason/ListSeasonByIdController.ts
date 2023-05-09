import { Request, Response } from "express";
import { ListSeasonByIdService } from "./ListSeasonByIdService";

export class ListSeasonByIdController {
    async handle(request: Request, response: Response) {
        const { seasonId } = request.params

        if (!seasonId) return response.status(400).json({message: "SeasonId é obrigatório"})

        const seasonService = new ListSeasonByIdService()

        const season = await seasonService.execute(seasonId)

        if (season instanceof Error) return response.status(400).json({message: season.message})

        return response.status(200).json({season})
    }
}