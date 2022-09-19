import { AppDataSource } from "../database/dataSource";
import { Anime } from "../entities";
import AnimeBrBiz from "../scraper/AnimeBrBiz";

export class UploadAnimesByGenreService {
    async execute(genre: string) {
        const repo = AppDataSource.getRepository(Anime)

        const animeBiz = new AnimeBrBiz()

        const animes = await animeBiz.getAnimesByGenre(genre)

        const anime = repo.create(animes[0])

        repo.save(anime)

        return anime
    }
}