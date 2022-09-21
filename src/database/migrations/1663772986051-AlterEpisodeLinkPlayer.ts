import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterEpisodeLinkPlayer1663772986051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "episodes",
            "linkPlayer",
            new TableColumn(
                {
                    name: "linkPlayer",
                    type: "varchar",
                    isNullable: true
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
