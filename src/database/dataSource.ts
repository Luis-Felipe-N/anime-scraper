import { DataSource } from 'typeorm'
import { Anime, Episode, Season } from '../entities'


export const AppDataSource = new DataSource({
    type: 'postgres',
    port: 5432,
    username: 'luisnunes',
    password: 'user123',
    database: 'animesv2',
    entities: [Anime,Season, Episode],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: true,
    logging: false,
})

export function createConnection(host = "database_anime"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
  }