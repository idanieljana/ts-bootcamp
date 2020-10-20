import fetch from 'node-fetch';
import { DirectorsResponse, MoviesResponse } from './types';

const baseUrl = 'http://localhost:3000';

/**
 * Rewrite with async/await method to get directors from the API
 */
export function getDirectorsAsync(): Promise<DirectorsResponse[]> {
  return fetch(`${baseUrl}/api/directors`)
    .then((r) => r.json())
    .catch((err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      return [];
    });
}

/**
 * Rewrite with async/await method to transform directors response to the list of links
 */
export function getMovieLinks(directors: DirectorsResponse[]): string[] {
  return directors.map((d) => d.movies).flat();
}

export function getJsonAsync<T>(url: string): Promise<T> {
  return fetch(url).then((r) => r.json());
}

/**
 * Rewrite with async/await method to get director movies from the API
 */
export function getMoviesAsync(directors: DirectorsResponse[]): Promise<MoviesResponse[]> {
  const promises = getMovieLinks(directors)
    .map((movieLink) => getJsonAsync<MoviesResponse>(movieLink));
  return Promise.all(promises).then((movies) => movies).catch((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    return [];
  });
}

interface MovieWithScore extends Pick<MoviesResponse, 'id' | 'title'> {
  score: number;
}

/**
 * Write a method to return movies with average score
 */
export function getMoviesWithScore(moviesResponse: MoviesResponse[]): Promise<MovieWithScore[]> {
  return Promise.resolve(moviesResponse as unknown as MovieWithScore[]);
}
