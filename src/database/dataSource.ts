import { DataSource } from 'typeorm'
import { Anime, Episode, Genre, Season } from '../entities'


export const AppDataSource = new DataSource({
    type: 'postgres',
    port: 5432,
    username: 'luisnunes',
    password: 'user123',
    database: 'animesv3',

    entities: [Anime,Season, Episode, Genre],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: true,
    logging: false,
})

export function createConnection(host = "localhost"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
  }