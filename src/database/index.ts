import { DataSource } from 'typeorm'
import { Episode } from '../modules/Anime/entities/Episode'


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'luisnunes',
    password: 'luis55948',
    database: 'animes',
    entities: [Episode],
    synchronize: true,
    logging: false,
    migrations: ['src/database/migrations/*.ts'],
})

AppDataSource.initialize()