export interface IMovie {
    id: number;
    name: string;
    year: number;
    poster: {
        url: string;
        previewUrl: string;
    };
    rating: {
        kp: number;
    };
    genres: { name: string }[];
}

export interface IMovieDetails extends IMovie {
    description: string;
}