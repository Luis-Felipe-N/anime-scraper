import { AppDataSource } from "../../../database/dataSource";
import { Genre } from "../../../entities";

interface IGenreResquest {
    slug: string;
    name: string
}

export class CreateGenreService {
    async execute(genres: IGenreResquest[]) {
        const repo = AppDataSource.getRepository(Genre)

        try {
            const genresCreated = await repo.save(genres)
            return genres
        } catch (error) {
            return new Error(error.message)
        }
    }
}