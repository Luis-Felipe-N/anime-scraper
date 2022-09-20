import { DataSource } from 'typeorm'
import { Anime, Episode, Genre, Season } from '../entities'


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'database_anime',
    port: 5432,
    username: 'luisnunes',
    password: 'user123',
    database: 'animes',
    entities: [Anime,Season, Episode, Genre],
    synchronize: true,
    logging: false,
    migrations: ['src/database/migrations/*.ts'],
})


AppDataSource.initialize()