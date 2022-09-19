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
        // const serviceEpisode = new CreateEpisodeService
        console.log(seasons)

        const seasonCreated = repoSeason.save(seasons)

        return seasonCreated
    }
}