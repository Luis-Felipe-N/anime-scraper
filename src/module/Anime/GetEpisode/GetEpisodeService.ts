import { IAnimes, ISeasonsAnime } from "../../../@types/AnimesScraper";
import { AppDataSource } from "../../../database/dataSource";
import { Episode } from "../../../entities";
import { GetAnimeBySlugService } from "../GetAnimeBySlug/GetAnimeBySlugService";

import { ListEpisodesBySeason } from "../ListEpisodesBySeason/ListEpisodesBySeasonService";
import { ListSeasonByIdService } from "../ListSeason/ListSeasonByIdService";

export class GetEpisodeService {
    async execute(episodeId: string) {
        const repo = AppDataSource.getRepository(Episode)
        
        const episode = await repo.findOneBy({
            id: episodeId
        })

        if (!episode) return new Error("Episodio não encontrado")
        
        const episodeBySeasonService = new ListEpisodesBySeason()
        const remainingEpisodes = await episodeBySeasonService.execute(episode.season_id)

        const seasonService = new ListSeasonByIdService()
        const season = await seasonService.execute(episode.season_id)

        if (!(season instanceof Error)) {
            const animeService = new GetAnimeBySlugService()
            const anime = await animeService.execute(season.anime_slug)
            if (!(anime instanceof Error)) return {
                episode,
                remainingEpisodes,
                anime
            }
        }

        return {
            episode,
            remainingEpisodes,
            anime: {}
        }
    }
}