import { AppDataSource } from "../../../../database/dataSource";
import { Genre } from "../../entities/Genre";

interface IGenreResquest {
    slug: string;
    name: string
}

export class CreateGenreService {
    async execute(genres: IGenreResquest[]) {
        const repo = AppDataSource.getRepository(Genre)

        try {
            const genresCreated = await repo.save(genres)
            return genresCreated
        } catch (error) {
            return new Error(error.message)
        }
    }
}
