import { AppDataSource } from "../../../database/dataSource";
import { Season } from "../../../entities";

export class ListSeasonByIdService {
    async execute(seasonId: string): Promise<Season | Error>     {
        const repo = AppDataSource.getRepository(Season)

        const season = await repo.findOne({
            where: { id: seasonId },
            relations: ["episodes"]
        })

        if (!season) return new Error("Temporada não encontrada")

        return season
    }
}