import { Repository } from "typeorm";
import { IEpisodesAnime } from "../../../@types/AnimesScraper";
import { AppDataSource } from "../../../database";
import { Episode } from "../entities/Episode";

export interface IEpisodesRepository {

    create({title, updated_at, image, linkPlayer, linkEmbed}: Episode): Promise<void>;
    list(): Promise<Episode[]>
}

class EpisodesRepository implements IEpisodesRepository {

    private repository: Repository<Episode>

    constructor() {
        this.repository = AppDataSource.getRepository(Episode)
    }

    async create({title, updated_at, image, linkPlayer, linkEmbed}) {
        const episode =  this.repository.create({
            title,
            image,
            linkEmbed,
            linkPlayer,
            updated_at
        })
    }

    async list(): Promise<Episode[]> {
        const episodes = this.repository.find()

        return episodes
    }

    // async listBySeasons() {

    // }
}

export { EpisodesRepository }  