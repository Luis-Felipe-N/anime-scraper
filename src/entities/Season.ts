import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from 'uuid'
import { Anime } from "./Anime";
import { Episode } from "./Episode";
import { Genre } from "./Genre";

@Entity()
export class Season {
    @PrimaryColumn()
    id: string

    @Column()
    title: string
    
    @Column()
    anime_slug: string

    @ManyToOne(() => Anime)
    @JoinColumn({ name: "anime_slug"})
    anime: Anime    

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }    
}