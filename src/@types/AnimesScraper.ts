export interface IEpisodesAnime {
    title: string;
    image: string | undefined;
    date: Date;
    linkPlayer: string | undefined
}

export interface ISeasonsAnime {
    title: string;
    episodes: IEpisodesAnime[];
}

export interface IAnimes {
    title: string;
    slug: string;
    banner: {
        src: string | undefined;
        alt: string | undefined;
    };
    rating: number;
    seasons: ISeasonsAnime[];
    description: string;
    genres: {
        name: string;
        slug: string;
    }[];
}
export interface I {
    title: string;
    slug: string;
    banner: {
        src: string | undefined;
        alt: string | undefined;
    };
    rating: number;
    seasons: ISeasonsAnime[];
    description: string;
    genres: {
        name: string;
        slug: string;
    }[];
}