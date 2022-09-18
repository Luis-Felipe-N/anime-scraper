import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEpisode1663508923492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "episodes",
                columns: [
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "image",
                        type: "varchar",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp"
                    },
                    {
                        name: "linkEmbed",
                        type: "varchar",
                    },
                    {
                        name: "linkPlayer",
                        type: "varchar"
                    }
                ],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("episodes")
    }

}
