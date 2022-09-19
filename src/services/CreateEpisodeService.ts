import { AppDataSource } from "../database/dataSource";
import { Episode, Season } from "../entities";

interface IEpisodeRequest {
    duration: number;
    image: string;
    linkEmbed: string;
    linkPlayer: string
    season_id: string
    title: string
    uploaded_at: Date
}

export class CreateEpisodeService {
    async execute({duration, image, linkEmbed, linkPlayer, season_id, title, uploaded_at}: IEpisodeRequest) {
        const repoEpisode = AppDataSource.getRepository(Episode)
        const repoSeason = AppDataSource.getRepository(Season)

        if (!await repoSeason.findOneBy({id: season_id}))  {
            return new Error("Temporada não existe!")
        }

        const episode = repoEpisode.create({duration, image, linkEmbed, linkPlayer, season_id, title, uploaded_at})

        repoEpisode.save(episode)

        return episode
    }
}