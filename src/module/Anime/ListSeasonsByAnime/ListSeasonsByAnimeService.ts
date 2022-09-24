import { AppDataSource } from "../../../database/dataSource";
import { Season } from "../../../entities";

export class ListSeasonsByAnimeService {
    async execute(animeSlug: string): Promise<Error | Season[]> {
        const repo = AppDataSource.getRepository(Season)

        try {
            const seasons = await repo.find({
                where: { anime_slug: animeSlug }
            })

            console.log(seasons)
    
            return seasons
        } catch (error) {
            return new Error(error.message)
        }
    }
}