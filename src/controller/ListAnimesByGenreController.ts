import { Request, Response } from "express";

export class ListAnimesByGenreController {
    async handle(request: Request, response: Response)  {
        const { genre } = request.body
    }
}