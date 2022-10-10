import { CreateSeasonService } from "../../../services/CreateSeasonService";
import { CreateGenreService } from "../CreateGenre/CreateGenreService";
import { Anime } from "../../../entities";
import { AppDataSource } from "../../../database/dataSource";
import AnimeBrBiz from "../../../scraper/AnimeBrBiz";
import { IAnimes, IGenres } from "../../../@types/AnimesScraper";
import { v4 as uuidV4} from 'uuid'

export class UpdateAnimesByGenreService {
    async execute(genre: string, startPage = 1) {
        const repo = AppDataSource.getRepository(Anime)
        const serviceSeason = new CreateSeasonService()
        const serviceGenre = new CreateGenreService()

        const animeBiz = new AnimeBrBiz()

        try {
            // TODO criar sistema para salvar várias páginas do animes
            const animesScraped: IAnimes[] = await animeBiz.getAnimesByGenre(genre, startPage)

            const animesGenresFilted = this.filterGenresFromAnimes(animesScraped)

            await serviceGenre.execute(animesGenresFilted)
            
            const animesFormated = animesScraped.map(({seasons, ...anime}) => {
                return anime
            })

            const animesCreated = await repo.save(animesFormated)


            const allSeasons = [];

            animesScraped.forEach(anime => {
                anime.seasons.forEach(season => {
                    if (anime.slug) {
                        allSeasons.push({
                            ...season,
                            anime_slug: anime.slug,
                        })
                    }
                })
            })

            await serviceSeason.execute(allSeasons)

            return animesCreated
        } catch (error) {
            console.log(error)
            return new Error(error.message)
        }        
    }

    private filterGenresFromAnimes(animes: IAnimes[]) {
        const animesGenres: IGenres[] = animes.map(({genres}) => {
            return genres
        }).flat()

        let genresFilted: IGenres[] = Object.values(animesGenres.reduce(
            (acc,cur) => (
                Object.assign( acc, {[cur.slug]:cur})
            ),{}
        ))

        return genresFilted

    }
}