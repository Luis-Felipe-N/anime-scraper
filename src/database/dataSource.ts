import { DataSource } from 'typeorm'
import { Anime, Episode, Genre, Season } from '../entities'

console.log('TGERT')

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'database_anime',
    port: 5432,
    username: 'luisnunes',
    password: 'user123',
    database: 'animes',
    entities: [Anime, Episode, Genre, Season],
    synchronize: true,
    logging: false,
    migrations: ['src/database/migrations/*.ts'],
})

AppDataSource.initialize().then(res => {
    console.log("BANCO RODANDO")
})