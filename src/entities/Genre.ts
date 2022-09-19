import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import {v4 as uuidV4} from 'uuid'

@Entity()
export class Genre {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    slug: string

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}