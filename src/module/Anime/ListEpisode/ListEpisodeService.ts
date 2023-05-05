import { IAnimes, ISeasonsAnime } from "../../../@types/AnimesScraper";
import { AppDataSource } from "../../../database/dataSource";
import { Episode } from "../../../entities";
import { GetAnimeBySlugService } from "../GetAnimeBySlug/GetAnimeBySlugService";
import { ListEpisodesBySeason } from "../ListEpisodesBySeason/ListEpisodesBySeasonService";
import { ListSeasonByIdService } from "../ListSeason/ListSeasonByIdService";
import { In } from "typeorm";

export class ListEpisodeService {
    async execute(episodeIDs: string[]) {
        const repo = AppDataSource.getRepository(Episode)
        
        const episodes = await repo.find({
            where: {
                id: In(episodeIDs)
            }
        })

        if (!episodes) return new Error("Episodio não encontrado")

        return {
            episodes
        }
    }
}