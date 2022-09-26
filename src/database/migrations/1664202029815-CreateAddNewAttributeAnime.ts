import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CreateAddNewAttributeAnime1664202029815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            "animes",
            [
                new TableColumn(
                    {
                        name: "cover",
                        type: "varchar",
                        isNullable: true
                    }
                ),
                new TableColumn(
                    {
                        name: "trailerYtId",
                        type: "varchar",
                        isNullable: true
                    }
                )
            ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
