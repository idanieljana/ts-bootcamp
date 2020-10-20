/* eslint-disable @typescript-eslint/no-unused-vars */

import fetch from 'node-fetch';
import { DirectorsResponse, MoviesResponse } from './types';

const baseUrl = 'http://localhost:3000';

/**
 * Write a method to get directors from the API
 */
export function getDirectors(): Promise<DirectorsResponse[]> {
  return Promise.resolve([]);
}

/**
 * Write a method to transform directors response to the list of links
 */
export function getMovieLinks(directors: DirectorsResponse[]): string[] {
  return [];
}

/**
 * Write a utility method to fetch and parse to JSON and refactor the method getDirectors()
 */
export function getJson<T>(url: string): Promise<T> {
  return Promise.resolve([] as unknown as T);
}

/**
 * Write a method to get director movies from the API
 */
export function getMovies(directors: DirectorsResponse[]): Promise<MoviesResponse[]> {
  return Promise.resolve([]);
}


/**
 * Write a method to get the fastest director recommendation response from the API
 * enddpoint: '/api/directors/recommendations/:timeout'
 */
export function getDirectorsRecommendations(urls: string[]): Promise<DirectorsResponse> {
    return Promise.resolve({} as DirectorsResponse);
}
