import { Repository } from "typeorm"
import { AppDataSource } from "../../../database"
import { Anime } from "../entities/Anime"

export interface IAnimesRepository {
    create({description, rating, slug, title}: Anime): Promise<void>
}

export class AnimesRepository implements IAnimesRepository{
    private animeRepository: Repository<Anime>

    constructor() {
        this.animeRepository = AppDataSource.getRepository(Anime)
    }

    async create() {
        
    }
} 