import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Anime {
    @PrimaryColumn()
    slug: string

    @Column()
    title: string

    @Column()
    rating: number

    @Column('text')
    description: string
}