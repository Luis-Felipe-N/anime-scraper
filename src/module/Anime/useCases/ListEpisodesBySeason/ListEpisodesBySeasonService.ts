import { AppDataSource } from "../../../../database/dataSource";
import { Episode } from "../../entities/Episode";
import { Season } from "../../entities/Season";

export class ListEpisodesBySeason {
    async execute(seasonId: string): Promise<Episode[] | Error> {
        const repoSeason = AppDataSource.getRepository(Season)

        if (!await repoSeason.findOneBy({id: seasonId})) return new Error("Temporada não encontrada")

        try {
            const repo = AppDataSource.getRepository(Episode)

            const episodes = await repo.find({
                where: { season_id: seasonId },
                order: {
                    duration: "DESC"
                }
            })  

            return episodes
        } catch (error) {
            
            return new Error(error.message)
        }


    }
}