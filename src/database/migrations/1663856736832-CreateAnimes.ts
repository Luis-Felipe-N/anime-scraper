import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAnimes1663856736832 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "animes",
                columns: [
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "slug",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "rating",
                        type: "float"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "cover",
                        type: "varchar"
                    }
                ],

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("animes")
    }

}
