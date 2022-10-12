import { AppDataSource } from "../../../database/dataSource";
import { Anime } from "../../../entities";

export class ListAnimesByGenreService {
    async execute(genre: string) {
        const repo = AppDataSource.getRepository(Anime) 

        const animes = await repo.find({
            where: {
                genres: {
                    name : genre
                }
            },
            order: {
                rating: "DESC"
            }
        })

        console.log(animes)

        if (!animes) return new Error(`Não há animes do gênero, ${genre}`)

        return animes
    }
}