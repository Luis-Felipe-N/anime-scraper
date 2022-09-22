import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSeasons1663856966259 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "seasons",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "anime_slug",
                        type: "varchar"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_anime_season",
                        columnNames: ["anime_slug"],
                        referencedTableName: "animes",
                        referencedColumnNames: ["slug"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("seasons")
    }

}
