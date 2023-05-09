import { AppDataSource } from "../../../../database/dataSource";
import { Genre } from "../../entities/Genre";

export class ListGenresService {
    async execute() {
        const repo = AppDataSource.getRepository(Genre)

        const genres = await repo.find()

        return genres
    }
}