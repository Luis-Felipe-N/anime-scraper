import { AppDataSource } from "../../../database/dataSource";
import { Episode, Season } from "../../../entities";

export class ListEpisodesBySeason {
    async execute(seasonId: string): Promise<Episode[] | Error> {
        const repoSeason = AppDataSource.getRepository(Season)

        if (!await repoSeason.findOneBy({id: seasonId})) return new Error("Temporada não encontrada")

        try {
            const repo = AppDataSource.getRepository(Episode)

            const episodes = await repo.find({
                where: { season_id: seasonId }
            })  

            return episodes
        } catch (error) {
            
            return new Error(error.message)
        }


    }
}