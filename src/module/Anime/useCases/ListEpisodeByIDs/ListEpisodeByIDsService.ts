import { In } from "typeorm";
import { AppDataSource } from "../../../../database/dataSource";
import { Episode } from "../../entities/Episode";


export class ListEpisodeByIDsService {
    async execute(episodeIDs: string[]) {
        const repo = AppDataSource.getRepository(Episode)
        console.log({episodeIDs})
        const episodes = await repo.find({
            where: {
                id: In(episodeIDs)
            }
        })

        console.log(episodes)

        if (!episodes) return new Error("Episodio não encontrado")

        return {
            episodes,
        }
    }
}