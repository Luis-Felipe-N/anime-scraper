import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Anime } from '../../Anime/entities/Anime';
import { Episode } from '../../Anime/entities/Episode';

  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    email: string;

    @Column()
    password: string;

    // @Column()
    // isPremium: boolean;

    @Column({
      default: ""
    })
    avatar: string;

    @Column({
      default: ""
    })
    banner: string;

    @ManyToMany(() => Anime, (anime) => anime.slug)
    @JoinTable()
    listFavorites: Anime[]

    @ManyToMany(() => Episode, (episode) => episode.id)
    @JoinTable()
    watchingEpisode: Episode[]
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }