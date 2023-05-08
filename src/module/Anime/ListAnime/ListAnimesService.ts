import { ILike } from "typeorm";
import { AppDataSource } from "../../../database/dataSource";
import { Anime } from "../../../entities";


export class ListAnimesService {
   async execute(query): Promise<{animes: Anime[], totalAnimes: number}> { 
         const repo = AppDataSource.getRepository(Anime)
         console.log(query)
         const [ animes, totalAnimes ] = await repo.findAndCount({
            relations: ["seasons", "genres"],
            skip: query?.skip || 0, 
            take: query?.take || 10,
            cache: true,
            where: {
               title: ILike(`%${query?.keyword}%`)
            }
         })

         return {
            animes,
            totalAnimes
         }
   }
}