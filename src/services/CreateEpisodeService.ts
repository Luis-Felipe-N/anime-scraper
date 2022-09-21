import { AppDataSource } from "../database/dataSource";
import { Episode } from "../entities";

interface IEpisodeRequest {
    duration: number;
    image: string;
    linkEmbed: string;
    linkPlayer: string;
    season_id: string;
    title: string;
    uploaded_at: Date;
    id: string;
    // season: Season
}

interface ICreateEpisodeService {
    episodes: Episode | Episode[]
}

export class CreateEpisodeService {
    async execute(episodes) {
        const repoEpisode = AppDataSource.getRepository(Episode)

        
        const episodesCreated = await repoEpisode.save(episodes)
        console.log(episodesCreated)

        return episodesCreated
    }
}