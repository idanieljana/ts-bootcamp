import {getDirectors, getMovies} from './promises';

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
});
