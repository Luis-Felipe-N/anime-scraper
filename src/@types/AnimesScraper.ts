export interface IEpisodesAnime {
    id?: string;
    title: string;
    image: string;
    uploaded_at: Date;
    linkPlayer?: string;
    linkEmbed: string;
    duration: number;
    season_id?: string;
}

export interface ISeasonsAnime {
    title: string;
    episodes: IEpisodesAnime[];
}

export interface IAnimes {
    seasons: ISeasonsAnime[];
    genres: {
        name: string;
        slug: string;
    }[];

    slug: string;
    title: string;
    rating: number;
    description: string;
    cover: string;
}
