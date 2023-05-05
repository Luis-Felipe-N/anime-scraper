import { AppDataSource } from "../../../database/dataSource";
import { Anime } from "../../../entities";

export class ListAnimesByGenreService {
    async execute(genre: string, query) {
        const repo = AppDataSource.getRepository(Anime) 

        const animes = await repo.find({
            skip: Number(query?.skip) || 0, 
            take: Number(query?.take) || 10,
            where: {
                genres: {
                    name : genre
                },
            },
            order: {
                rating: "DESC"
            }
        })

        if (!animes) return new Error(`Não há animes do gênero, ${genre}`)

        return animes
    }
}