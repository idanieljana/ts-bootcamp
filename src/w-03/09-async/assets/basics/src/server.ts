import * as express from 'express';
import * as faker from 'faker';
import { Request, Response } from 'express';
import { Director } from './types';

const app = express();
const port = process.env.PORT || 3000;
const baseUri = `http://localhost:${port}`;

const directors: Director[] = [
  {
    id: 1,
    name: 'James Cameron',
    movies: [
      {
        id: 1,
        title: 'Titanic',
      },
      {
        id: 2,
        title: 'The Terminator',
      },
      {
        id: 3,
        title: 'Avatar',
      },
    ],
  },
  {
    id: 2,
    name: 'Quentin Tarantino',
    movies: [
      {
        id: 4,
        title: 'Django Unchained',
      },
      {
        id: 5,
        title: 'Inglourious Basterds',
      },
      {
        id: 6,
        title: 'Grindhouse',
      },
    ],
  },
  {
    id: 3,
    name: 'Wes Anderson',
    movies: [
      {
        id: 7,
        title: 'The Grand Budapest Hotel',
      },
      {
        id: 8,
        title: 'Moonrise Kingdom',
      },
      {
        id: 9,
        title: 'Fantastic Mr. Fox',
      },
    ],
  },
  {
    id: 4,
    name: 'Stanley Kubrick',
    movies: [
      {
        id: 10,
        title: '2001: A Space Odyssey',
      },
      {
        id: 11,
        title: 'The Shining',
      },
      {
        id: 12,
        title: 'A Clockwork Orange',
      },
    ],
  },
];

app.get('/', async (req: Request, res: Response) => {
  res.send('Directors movies app. Available API: </br>' +
      '/api/directors, </br>' +
      '/api/directors/:id/movies, </br>' +
      '/api/movies/:id/reviews </br>' +
      '/api/directors/recommendations/:timeout </br>'
  );
});

/**
 * Returns directors list
 */
app.get('/api/directors', async (req: Request, res: Response) => {
  res.json(directors.map((d) => ({
    id: d.id,
    name: d.name,
    movies: `${baseUri}/api/directors/${d.id}/movies`,
  })));
});

/**
 * Returns director movies by provided ID
 */
app.get('/api/directors/:id/movies', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10) || 0;
  const movies = directors.find((d) => d.id === id)?.movies || [];
  res.json(movies.map((m) => ({
    ...m,
    reviews: `${baseUri}/api/movies/${m.id}/reviews`,
  })));
});

/**
 * Returns 3 random reviews
 */
app.get('/api/movies/:id/reviews', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10) || 0;
  const reviews = [
    {
      id: Math.floor(Math.random() * 1000),
      reviewer: faker.internet.email(),
      rating: (id * 3) % 10,
    },
    {
      id: Math.floor(Math.random() * 1000),
      reviewer: faker.internet.email(),
      rating: (id * 4) % 10,
    },
    {
      id: Math.floor(Math.random() * 1000),
      reviewer: faker.internet.email(),
      rating: (id * 9) % 10,
    },
  ];
  res.json(reviews.map((r) => ({
    ...r,
    reviewer: r.reviewer.toLowerCase(),
  })));
});

/**
 * Returns random director recommendation by the timeout
 */
app.get('/api/directors/recommendations/:timeout', async (req: Request, res: Response) => {
  const MAX_TIMEOUT_MS = 5000;
  const timeout = parseInt(req.params.timeout, 10);
  const id = timeout % 3;
  const director = directors[id];
  setTimeout(() => {
    res.json({
      id: director.id,
      name: director.name,
    });
  }, Math.min(timeout, MAX_TIMEOUT_MS) )
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at ${baseUri}`);
});
