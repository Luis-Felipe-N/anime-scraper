export interface IEpisodesAnime {
    title: string;
    image: string | undefined;
    uploadedAt: Date;
    linkPlayer: string | undefined,
    linkEmbed: string
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
    description: string;
    seasons: ISeasonsAnime[];
    genres: {
        name: string;
        slug: string;
    }[];
}
