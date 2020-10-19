import fetch from 'node-fetch';
import { DirectorsResponse, MoviesResponse } from './types';

const baseUrl = 'http://localhost:3000';

/**
 * Rewrite with async/await method to get directors from the API
 */
export async function getDirectorsAsync(): Promise<DirectorsResponse[]> {
  try {
    return await getJsonAsync<DirectorsResponse[]>(`${baseUrl}/api/directors`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return [];
  }
}

/**
 * Rewrite with async/await method to transform directors response to the list of links
 */
export function getMovieLinks(directors: DirectorsResponse[]): string[] {
  return directors.map((d) => d.movies).flat();
}

/**
 * Rewrite  utility method to fetch and parse to JSON and refactor the method getDirectors()
 */
export async function getJsonAsync<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const json = response.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(json);
    }, 0);
  });
}

/**
 * Write a method to get director movies from the API
 */
export async function getMoviesAsync(directors: DirectorsResponse[]): Promise<MoviesResponse[]> {
  try {
    // eslint-disable-next-line no-console
    console.time('get movies');
    const promises = getMovieLinks(directors).map((movieLink) => getJsonAsync<MoviesResponse>(movieLink));
    const results = await Promise.all(promises);
    // eslint-disable-next-line no-console
    console.timeEnd('get movies');
    return results;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return [];
  }
}
