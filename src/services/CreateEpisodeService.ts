import { AppDataSource } from "../database/dataSource";
import { Episode, Season } from "../entities";

interface IEpisodeRequest {
    season_id: string; 
    id: string; 
    title: string; 
    image: string; 
    uploaded_at: Date; 
    linkPlayer: string; 
    linkEmbed: string; 
    duration: number; 
    season: Season;
}


export class CreateEpisodeService {
    async execute(episodes: Episode[]) {
        const repoEpisode = AppDataSource.getRepository(Episode)

        const episodesCreated = await repoEpisode.save(episodes)

        return episodesCreated
    }
}