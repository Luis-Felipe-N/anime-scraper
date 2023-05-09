import { AppDataSource } from "../../../../database/dataSource";
import { User } from "../../entities/User";

interface ICreateUserService {
    name: string;
    email: string;
    password: string;
}

export class createUserService {
    async execute({ name, email, password }: ICreateUserService) {
        const repository = AppDataSource.getRepository(User)

        await repository.save({
            name, email, password
        })
    }
}