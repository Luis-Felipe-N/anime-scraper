import { ILike, IsNull, Not } from "typeorm";
import { AppDataSource } from "../../../../database/dataSource";
import { Anime } from "../../entities/Anime";

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
               title: ILike(`%${query?.keyword}%`),
               seasons: {
                  id: Not(IsNull())
               }
            }
         })

         return {
            animes,
            totalAnimes
         }
   }
}