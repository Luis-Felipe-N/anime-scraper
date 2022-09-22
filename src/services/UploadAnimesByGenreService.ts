import { AppDataSource } from "../database/dataSource";
import { Anime as AnimeEntitie, Season } from "../entities";
import AnimeBrBiz from "../scraper/AnimeBrBiz";
import { CreateSeasonService } from "./CreateSeasonService";
import { v4 as uuidV4} from 'uuid'
import { IAnimes } from "../@types/AnimesScraper";

export class UploadAnimesByGenreService {
    async execute(genre: string, startPage = 1) {
        const repo = AppDataSource.getRepository(AnimeEntitie)
        const serviceSeason = new CreateSeasonService()

        const animeBiz = new AnimeBrBiz()

        try {
            const animesScraped: IAnimes[] = await animeBiz.getAnimesByGenre(genre, startPage)
            const animesFormated = animesScraped.map(({seasons, genres, ...anime}) => {
                return anime
            })

            const animesCreated = await repo.save(animesFormated)


            const allSeasons = [];

            animesScraped.forEach(anime => {
                anime.seasons.forEach(season => {
                    if (anime.slug) {
                        allSeasons.push({
                            id: uuidV4(),
                            ...season,
                            anime_slug: anime.slug,
                        })
                    }
                })
            })

            await serviceSeason.execute(allSeasons)

            return animesCreated
        } catch (error) {
            
            return new Error(error.message)
        }

        
    }
}