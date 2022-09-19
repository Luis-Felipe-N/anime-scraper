import { IAnimes } from "../@types/AnimesScraper";
import { AppDataSource } from "../database/dataSource";
import { Anime as AnimeEntitie, Season } from "../entities";
import AnimeBrBiz from "../scraper/AnimeBrBiz";
import { CreateSeasonService } from "./CreateSeasonService";
import { v4 as uuidV4} from 'uuid'

export class UploadAnimesByGenreService {
    async execute(genre: string) {
        const repo = AppDataSource.getRepository(AnimeEntitie)
        const serviceSeason = new CreateSeasonService()

        const animeBiz = new AnimeBrBiz()

        const animesScraped = await animeBiz.getAnimesByGenre(genre)

        const animesCreated = await repo.save(animesScraped)

        const animesSeasons = animesCreated.map(anime => {
            return anime.seasons.map(season => {
                if (anime.slug) {
                    return {
                        id: uuidV4(),
                        ...season,
                        anime_slug: anime.slug
                    }
                }
            })
        })[0]

        const seasonsCreated = await serviceSeason.execute(animesSeasons)

        return animesCreated
    }
}