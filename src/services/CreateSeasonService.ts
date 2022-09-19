import { AppDataSource } from "../database/dataSource";
import { Episode, Season } from "../entities";

interface ISeasonRequest {
    
}

export class CreateSeasonService {
    async execute() {
        const repoSeason = AppDataSource.getRepository(Season)

        const season = repoSeason.create()

        repoSeason.save(season)

        return season
    }
}