import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAnimeGenres1663889291954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "animesgenres",
                foreignKeys: [
                    {
                        name: "fk_genre_anime",
                        columnNames: ["genre_slug"],
                        referencedTableName: "genres",
                        referencedColumnNames: ["slug"]
                    },
                    {
                        name: "fk_anime_genre",
                        columnNames: ["anime_slug"],
                        referencedTableName: "animes",
                        referencedColumnNames: ["slug"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(
            "animesgenres"
        )
    }

}
