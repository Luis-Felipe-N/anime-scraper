import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterEpisodeLinkEmbed1663726673193 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "episodes",
            "linkEmbed",
            new TableColumn(
                {
                    name: "linkEmbed",
                    type: "varchar",
                    isNullable: true
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
