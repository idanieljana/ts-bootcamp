import fetch from 'node-fetch';
import { DirectorsResponse, MoviesResponse } from './types';

const baseUrl = 'http://localhost:3000';

/**
 * Rewrite with async/await method to get directors from the API
 */
export function getDirectors(): Promise<DirectorsResponse[]> {
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

export function getJson<T>(url: string): Promise<T> {
    return fetch(url).then((r) => r.json());
}

/**
 * Rewrite with async/await method to get director movies from the API
 */
export function getMovies(directors: DirectorsResponse[]): Promise<MoviesResponse[]> {
    const promises = getMovieLinks(directors)
        .map((movieLink) => getJson<MoviesResponse>(movieLink));
    return Promise.all(promises).then((movies) => movies).catch((err) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
        return [];
    });
}

/**
 * Write a method to get the fastest director recommendation response from the API
 * enddpoint: '/api/directors/recommendations/:timeout'
 */
export function getDirectorsRecommendations(urls: string[]): Promise<DirectorsResponse> {
    const promises = urls.map(u => fetch(u).then(r => r.json()));
    return Promise.race<DirectorsResponse>(promises).then((value) => value);
}
