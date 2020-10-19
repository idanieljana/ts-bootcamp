export interface Director {
  id: number;
  name: string;
  movies: Movie[];
}

export interface DirectorsResponse {
  id: number;
  name: string;
  movies: string[];
}

export interface Movie {
  id: number;
  title: string;
}

export interface MoviesResponse {
  id: number;
  title: string;
  reviews: string[]
}
