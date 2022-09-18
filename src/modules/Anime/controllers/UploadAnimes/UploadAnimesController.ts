import { Request, Response } from "express";
import { IAnimesRepository } from "../../repositores/AnimesRepository";

export class UploadAnimesController {
    constructor(private animeRepository: IAnimesRepository) {}

    async handle(request: Request, response: Response) {

    }
}