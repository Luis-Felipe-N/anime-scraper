import { Request, Response } from "express";
import { createUserService } from "./createUserService";

export class createUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const createUser = new createUserService()

        await createUser.execute({
            name, email, password
        })  
        return response.status(201).send()
    }
}