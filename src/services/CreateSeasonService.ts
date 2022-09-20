import { IEpisodesAnime } from "../@types/AnimesScraper";
import { AppDataSource } from "../database/dataSource";
import { Episode, Season } from "../entities";
import { CreateEpisodeService } from "./CreateEpisodeService";

interface ISeasonRequest {
    anime_slug: string;
    title: string;
    id: string;
}

export class CreateSeasonService {
    async execute(seasons: ISeasonRequest[]) {
        const repoSeason = AppDataSource.getRepository(Season)
        
        if (!seasons) {
            return new Error("Não é possível salvar Temporada inexistente")
        }

        console.log("SEASONS", seasons)

        const seasonCreated = repoSeason.save(seasons)

        return seasonCreated
    }
}