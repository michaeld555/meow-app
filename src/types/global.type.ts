
export class PageableTheMovieDb<T> {
    public page: number = 1;
    public results: Array<T> = [];
    public data: Array<T> = [];
    public total_pages: number = 1;
    public totalResults: number = 0;
    public episodes: Array<T> = [];
}

export interface ItemDetail {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    video: boolean;
    vote_average: number;
    vote_count: number;
    runtime: number | null;
    url_image: string;
    url_image2: string;
    url_image3: string;
}