export interface IGenres {
    name: string;
    slug: string;
}

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
    id: string;
    title: string;
    episodes: IEpisodesAnime[];
}

export interface IAnimes {
    seasons: ISeasonsAnime[];
    genres: IGenres[];
    slug: string;
    title: string;
    rating: number;
    description: string;
    cover?: string;
    post: string;
    trailerYtId?: string;
}
