import { AppDataSource } from "../../../database/dataSource";
import { Anime } from "../../../entities";

export class ListAnimeBySlugService {
    async execute(slug: string): Promise<Anime | Error> {
        const repo = AppDataSource.getRepository(Anime)

        const anime = await repo.findOne({
            where: {slug},
            relations: ["seasons", "seasons.episodes"]
        })

        console.log("ANIME", anime)

        if(!anime) return new Error("Anime não foi encontrado")

        return anime
    }
}
