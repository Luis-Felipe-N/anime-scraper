import { AppDataSource } from "../../../database/dataSource";
import { Episode } from "../../../entities";
import { ListEpisodesBySeason } from "../ListEpisodesBySeason/ListEpisodesBySeasonService";

export class ListEpisodeService {
    async execute(episodeId: string) {
        const repo = AppDataSource.getRepository(Episode)
        
        const episode = await repo.findOneBy({
            id: episodeId
        })
        console.log(episode)
        
        if (!episode) return new Error("Episodio não encontrado")
        
        const episodeBySeasonService = new ListEpisodesBySeason()
        const remainingEpisodes = await episodeBySeasonService.execute(episode.season_id)
        console.log(remainingEpisodes)

        return {
            episode,
            remainingEpisodes
        }
    }
}