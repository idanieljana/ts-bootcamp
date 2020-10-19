import * as express from 'express';
import * as faker from 'faker';
import { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;
const baseUri = `http://localhost:${port}`;

interface Director {
  id: number;
  name: string;
  movies: Movie[];
}

interface Movie {
  id: number;
  title: string;
}

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
  res.send('Directors movies app. Available API: /api/directors, /api/directors/:id/movies, /api/movies/:id/reviews');
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
  res.json(movies.map(m => {
    return {
      ...m,
      reviews: `${baseUri}/api/movies/${m.id}/reviews`,
    }
  }));
});

/**
 * Returns 3 random reviews
 */
app.get('/api/movies/:id/reviews', async (req: Request, res: Response) => {
  const reviews = [
    {
      id: Math.floor(Math.random() * 1000),
      reviewer: faker.internet.email(),
      rating: Math.floor(Math.random() * 10),
    },
    {
      id: Math.floor(Math.random() * 1000),
      reviewer: faker.internet.email(),
      rating: Math.floor(Math.random() * 10),
    },
    {
      id: Math.floor(Math.random() * 1000),
      reviewer: faker.internet.email(),
      rating: Math.floor(Math.random() * 10),
    },
  ];
  res.json(reviews.map((r) => ({
    ...r,
    reviewer: r.reviewer.toLowerCase(),
  })));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at ${baseUri}`);
});
