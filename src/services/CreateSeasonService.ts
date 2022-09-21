import { AppDataSource } from "../database/dataSource";
import { Episode, Season } from "../entities";
import { CreateEpisodeService } from "./CreateEpisodeService";
import { v4 as uuidV4} from 'uuid'

interface ISeasonRequest {
    anime_slug: string;
    title: string;
    id: string;
    episodes: Episode[];
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

            let allEpisodes = [];

            seasons.forEach(seasonAnime => {
                seasonAnime.episodes.forEach(({season, ...episode}) => {
                    console.log(episode)
                    if (seasonAnime && seasonAnime.id && seasonAnime.anime_slug && episode.linkEmbed && episode.linkPlayer) {
                        allEpisodes.push({
                            id: uuidV4(),
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