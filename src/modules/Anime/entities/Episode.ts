import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from "typeorm"

@Entity()
export class Episode {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    image: string

    @UpdateDateColumn()
    updated_at: Date

    @Column("text")
    linkEmbed: string

    @Column("text")
    linkPlayer: string
}