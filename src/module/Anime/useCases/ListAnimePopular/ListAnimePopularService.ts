import { IsNull, Not } from "typeorm"
import { AppDataSource } from "../../../../database/dataSource"
import { Anime } from "../../entities/Anime"

export class ListAnimePopularService {
    async execute() {
        const repo = AppDataSource.getRepository(Anime)

        const animes = repo.find({
            where: {
                cover: Not(IsNull()),
                youtubeVideoId: Not(IsNull()),
                seasons: {
                    id: Not(IsNull())
                }
            },
            order: {
                rating: 'DESC'
            },
            take: 10,
            relations: ["genres"]
        })

        return animes
    }
}