import { ILike, Like } from "typeorm";
import { AppDataSource } from "../../../database/dataSource";
import { Anime } from "../../../entities";


export class ListAnimesService {
   async execute(query): Promise<{animes: Anime[], totalAnimes: number}> { 
         const repo = AppDataSource.getRepository(Anime)

         const [ animes, totalAnimes ] = await repo.findAndCount({
            relations: ["seasons", "genres"],
            skip: query?.page || 0, 
            take: query?.take || 10,
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