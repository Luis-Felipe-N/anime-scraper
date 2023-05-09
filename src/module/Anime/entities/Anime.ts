import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Season } from "./Season";
import { Genre } from "./Genre";

@Entity()
export class Anime {
    @PrimaryColumn()
    slug: string

    @Column()
    title: string

    @Column("float8")
    rating: number

    @Column()
    description: string

    @Column({
        nullable: true
    })
    cover: string

    @Column()
    post: string

    @Column({
        nullable: true
    })
    youtubeVideoId: string

    @Column({
        default: true
    })
    nsfw: boolean

    @Column({
        nullable: true
    })
    status: string

    @OneToMany(() => Season, season => season.anime)
    @JoinColumn()
    seasons: Season[]

    @ManyToMany(() => Genre, genre => genre.animes)
    @JoinTable()
    genres: Genre[]
}