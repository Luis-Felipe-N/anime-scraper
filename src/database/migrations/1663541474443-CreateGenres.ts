import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateGenres1663541474443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "genres",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "slug",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "anime_slug",
                        type: "varchar"
                    }
                ],
                foreignKeys: [
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
        await queryRunner.dropTable("genres")
    }

}
