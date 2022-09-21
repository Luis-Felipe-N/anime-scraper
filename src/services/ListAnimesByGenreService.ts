import { AppDataSource } from "../database/dataSource";
import { Anime } from "../entities";

export class ListAnimesByGenre {
    async execute(genre: string): Promise<Anime[] | Error> {
        const repo = AppDataSource.getRepository(Anime)

        // Adicionar verificação se há gênero

        const animesByGenre = await repo.find({
            relations: ["seasons", "seasons.episodes"],
            where: {}
        })

        if (!animesByGenre) return new Error("Animes não encontrados")
        
        return animesByGenre
    }
}