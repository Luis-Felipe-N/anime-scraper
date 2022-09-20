import { Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import {v4 as uuidV4} from 'uuid'
import { Anime } from "./Anime"
import { Season } from "./Season"

export class Episode {
    @PrimaryColumn()
    id: string

    @Column()
    title: string

    @Column()
    image: string

    @Column()
    uploaded_at: Date

    @Column()
    linkPlayer: string

    @Column()
    linkEmbed: string

    @Column()
    duration: number

    @Column()
    season_id: string

    @ManyToOne(() => Season, season => season.episodes)
    @JoinColumn({ name: "season_id"})
    season: Season

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}