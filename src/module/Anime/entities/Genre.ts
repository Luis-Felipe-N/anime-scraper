import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Anime } from "./Anime";

@Entity()
export class Genre {

    @Column()
    name: string;

    @PrimaryColumn({
        unique: true
    })
    slug: string;

    @ManyToMany(() => Anime, anime => anime.seasons)
    @JoinTable()
    animes: Anime[]
}