import { AppDataSource } from "../../../database/dataSource";
import { Anime } from "../../../entities";

export class ListAnimesByGenreService {
    async execute(genre: string) {
        const repo = AppDataSource.getRepository(Anime) 

        const animes = await repo.find({
            where: {
                genres: {
                    slug: genre
                }
            }
        })

        if (!animes) return new Error(`Não há animes do gênero, ${genre}`)

        return animes
    }
}