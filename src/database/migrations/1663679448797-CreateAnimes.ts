import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAnimes1663679448797 implements MigrationInterface {

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
                        type: "numeric"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "cover",
                        type: "varchar  "
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("animes")
    }

}
