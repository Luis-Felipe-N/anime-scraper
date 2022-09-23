import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, Unique } from "typeorm";
import {v4 as uuidV4} from 'uuid'
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