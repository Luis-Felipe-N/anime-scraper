import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Anime } from "./Anime";
import { Episode } from "./Episode";

@Entity()
export class Season {
    @PrimaryColumn()
    id: string

    @Column()
    title: string
    
    @Column()
    anime_slug: string

    @ManyToOne(() => Anime,  anime => anime.seasons)
    @JoinColumn({name: "anime_slug"})
    anime: Anime

    @OneToMany(() => Episode, episode => episode.season)
    @JoinColumn()
    episodes: Episode[]
}