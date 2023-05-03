import { In } from "typeorm";
import { AppDataSource } from "../../../database/dataSource";
import { Anime } from "../../../entities";

export class ListAnimesBySlugsService {
    async execute(slugs: string[]): Promise<Anime[] | Error> {
        const repo = AppDataSource.getRepository(Anime)

        console.log(slugs)

        const animes = await repo.find({
            where: {
                slug: In(slugs)
            },
            relations: ["seasons", "genres"]
        })

        if(!animes) return new Error("Anime não foi encontrado")

        return animes
    }
}
