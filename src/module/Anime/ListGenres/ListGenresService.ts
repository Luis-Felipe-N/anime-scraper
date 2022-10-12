import { AppDataSource } from "../../../database/dataSource";
import { Genre } from "../../../entities";

export class ListGenresService {
    async execute() {
        const repo = AppDataSource.getRepository(Genre)

        const genres = await repo.find()

        return genres
    }
}