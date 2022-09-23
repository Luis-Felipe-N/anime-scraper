import { AppDataSource } from "../../../database/dataSource";
import { Anime } from "../../../entities";


export class ListAnimesService {
   async execute(): Promise<Anime[]> { 
        const repo = AppDataSource.getRepository(Anime)

        const animes = repo.find({
         relations: ["seasons", "seasons.episodes", "genres"]
        })

        return animes
   }
}