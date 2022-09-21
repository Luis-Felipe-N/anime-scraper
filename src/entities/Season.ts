import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from 'uuid'
import { Anime } from "./Anime";
import { Episode } from "./Episode";

@Entity("Seasons")
export class Season {
    @PrimaryColumn()
    id: string

    @Column()
    title: string
    
    @Column()
    anime_slug: string

    @ManyToOne(() => Anime,  anime => anime.seasons)
    @JoinColumn({name: `anime_slug`})
    anime: Anime

    @OneToMany(() => Episode, episode => episode.season)
    @JoinColumn()
    episodes: Episode[]

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }    
}