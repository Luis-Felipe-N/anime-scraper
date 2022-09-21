import { AppDataSource } from "../database/dataSource";
import { Season } from "../entities";
import { CreateEpisodeService } from "./CreateEpisodeService";
import { v4 as uuidV4} from 'uuid'

interface ISeasonRequest {
    anime_slug: string;
    title: string;
    id: string;
}

export class CreateSeasonService {
    async execute(seasons: ISeasonRequest[]) {
        const repoSeason = AppDataSource.getRepository(Season)
        const episodeService = new CreateEpisodeService()
        
        if (!seasons) {
            return new Error("Não é possível salvar Temporada inexistente")
        }

        seasons.forEach(season => console.log(season.anime_slug))

        const seasonCreated = await repoSeason.save(seasons)

        const seasonsEpisodes = seasonCreated.map(season => {
            return season.episodes.map(episode => {
                if (season.id) {
                    return {
                        id: uuidV4(),
                        ...episode,
                        season_id: season.id
                    }
                }
            })
        })

        await episodeService.execute(seasonsEpisodes.flat())

        return seasonCreated
    }
}