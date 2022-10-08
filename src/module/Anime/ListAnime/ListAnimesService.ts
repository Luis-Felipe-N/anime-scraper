import { AppDataSource } from "../../../database/dataSource";
import { Anime } from "../../../entities";


export class ListAnimesService {
   async execute(): Promise<Anime[]> { 
         const repo = AppDataSource.getRepository(Anime)

         const animes = repo.find({
            relations: ["seasons", "genres"],
            // skip: 0, 
            // take: 10
         })

         return animes
   }
}