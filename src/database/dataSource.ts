import { config } from "dotenv"
import { DataSource } from 'typeorm'

import { CreateAnimes1663856736832 } from './migrations/1663856736832-CreateAnimes';
import { CreateSeasons1663856966259 } from './migrations/1663856966259-CreateSeasons';
import { CreateEpisodes1663857008366 } from './migrations/1663857008366-CreateEpisodes';
import { CreateGenres1663888538964 } from './migrations/1663888538964-CreateGenres';
import { CreateAnimeGenres1663889291954 } from './migrations/1663889291954-CreateAnimeGenres';
import { CreateAddNewAttributeAnime1664202029815 } from './migrations/1664202029815-CreateAddNewAttributeAnime';
import { CreateAddNewAttributeAnime1664240121831 } from './migrations/1664240121831-CreateAddNewAttributeAnime';
import { Anime } from '../module/Anime/entities/Anime';
import { Season } from '../module/Anime/entities/Season';
import { Episode } from '../module/Anime/entities/Episode';
import { Genre } from '../module/Anime/entities/Genre';
import { User } from "../module/User/entities/User";

config()

export const AppDataSource = new DataSource({
    // @ts-ignore
    type: process.env.DATABASE_TYPE,
    // @ts-ignore
    url: process.env.DATABASE_URL,
    // ssl: true,
    entities: [Anime, Season, Episode, Genre, User],
    migrations: [
        CreateAnimes1663856736832,
        CreateSeasons1663856966259,
        CreateEpisodes1663857008366,
        CreateGenres1663888538964,
        CreateAnimeGenres1663889291954,
        CreateAddNewAttributeAnime1664202029815,
        CreateAddNewAttributeAnime1664240121831
    ],
    synchronize: true,
    logging: false,
})

export function createConnection(host = "localhost"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
  }