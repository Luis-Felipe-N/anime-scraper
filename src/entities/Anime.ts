import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Anime {
    @PrimaryColumn()
    slug: string

    @Column()
    title: string

    @Column()
    rating: number

    @Column()
    description: string

    @Column()
    cover: string
}