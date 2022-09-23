import { Column, Entity, IsNull, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import {v4 as uuidV4} from 'uuid'
import { Season } from "./Season"

@Entity()
export class Episode {
    @PrimaryColumn()
    id: string

    @Column()
    title: string

    @Column()
    image: string

    @Column()
    uploaded_at: Date

    @Column({
        nullable: true
    })
    linkPlayer: string

    @Column()
    linkEmbed: string

    @Column("float8")
    duration: number

    @Column()
    season_id: string

    @ManyToOne(() => Season, season => season.episodes)
    @JoinColumn({ name: "season_id"})
    season?: Season

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}