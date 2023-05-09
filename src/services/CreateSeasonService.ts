import { AppDataSource } from "../database/dataSource";
import { Episode } from "../module/Anime/entities/Episode";
import { Season } from "../module/Anime/entities/Season";
import { CreateEpisodeService } from "./CreateEpisodeService";

interface ISeasonRequest {
    anime_slug: string;
    title: string;
    episodes: Episode[];
    id?: string;
}

export class CreateSeasonService {
    async execute(seasons: ISeasonRequest[]) {
        const repoSeason = AppDataSource.getRepository(Season)
        const episodeService = new CreateEpisodeService()

        const seasonsFormated = seasons.map(({episodes, ...season}) => {
            return season
        })

        try {
            const seasonCreated = await repoSeason.save(seasonsFormated)

            let allEpisodes: Episode[] = [];

            seasons.forEach(seasonAnime => {
                seasonAnime.episodes.forEach(({season, ...episode}) => {
                    if (seasonAnime.anime_slug && episode.linkEmbed) {
                        allEpisodes.push({
                            ...episode,
                            season_id: seasonAnime.id
                        })
                    }
                })
            })
            await episodeService.execute(allEpisodes)
    
            return seasonCreated
        } catch(error) {
            return new Error("Não foi possível salvar temporadas")
        }


    }
}