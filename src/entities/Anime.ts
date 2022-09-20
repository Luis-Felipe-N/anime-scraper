import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Season } from "./Season";

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

    @OneToMany(() => Season, season => season.anime)
    @JoinColumn()
    seasons: Season[]
}