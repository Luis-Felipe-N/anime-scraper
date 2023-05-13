import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../../../../database/dataSource";
import { Anime } from "../../entities/Anime";

export class ListAnimesByGenreService {
    async execute(genre: string, query) {
        const repo = AppDataSource.getRepository(Anime) 

        const animes = await repo.find({
            skip: Number(query?.skip) || 0, 
            take: Number(query?.take) || 20,
            where: {
                cover: Not(IsNull()),
                post: Not(IsNull()),
                genres: {
                    name : genre
                },
                seasons: {
                    id: Not(IsNull())
                 }
            },
            order: {
                rating: "DESC"
            }
        })

        if (!animes) return new Error(`Não há animes do gênero, ${genre}`)

        return animes
    }
}