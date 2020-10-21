import { getDirectors, getDirectorsRecommendations, getMovies } from './promises';

describe('promises', () => {
  test('should return list of directors', async () => {
    const directors = await getDirectors();
    expect(directors).toMatchSnapshot();
  });
  test('should return list of directors movies', async () => {
    const directors = await getDirectors();
    const movies = await getMovies(directors);
    expect(movies).toMatchSnapshot();
  });
  test('should return fastest recommendation', async () => {
    // eslint-disable-next-line no-console
    console.time('Getting fastest recommendation');
    const director = await getDirectorsRecommendations([
      'http://localhost:3000/api/directors/recommendations/1000',
      'http://localhost:3000/api/directors/recommendations/2000',
      'http://localhost:3000/api/directors/recommendations/3000',
      'http://localhost:3000/api/directors/recommendations/4000',
      'http://localhost:3000/api/directors/recommendations/5000',
      'http://localhost:3000/api/directors/recommendations/6000',
      'http://localhost:3000/api/directors/recommendations/7000',
      'http://localhost:3000/api/directors/recommendations/8000',
      'http://localhost:3000/api/directors/recommendations/9000',
      'http://localhost:3000/api/directors/recommendations/10000',
    ]);
    // eslint-disable-next-line no-console
    console.timeEnd('Getting fastest recommendation');
    expect(director).toEqual({
      id: 2,
      name: 'Quentin Tarantino',
      movies: 'http://localhost:3000/api/directors/2/movies',
    });
  });
});
