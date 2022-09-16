export interface IEpisodesAnime {
    title: string;
    image: string | undefined;
    date: Date;
    link: string | undefined
}

export interface ISeasonsAnime {
    title: string;
    episodes: IEpisodesAnime[];
}

export interface IAnimes {
    title: string;
    slug: string;
    rating: number;
    banner: {
        src: string | undefined;
        alt: string | undefined;
    };
    description: string;
    seaseons: ISeasonsAnime[];
    genres: {
        name: string;
        slug: string;
    }[]
}