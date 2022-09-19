import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEpisodes1663541094297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "episodes",
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
                        name: "image",
                        type: "varchar"
                    },
                    {
                        name: "uploaded_at",
                        type: "timestamp"
                    },
                    {
                        name: "linkPlayer",
                        type: "varchar"
                    },
                    {
                        name: "linkEmbed",
                        type: "varchar"
                    },
                    {
                        name: "duration",
                        type: "numeric"
                    },
                    {
                        name: "season_id",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_season_episode",
                        columnNames: ["season_id"],
                        referencedTableName: "seasons",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(
            "episodes"
        )
    }

}
