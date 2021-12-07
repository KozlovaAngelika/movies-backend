import { Request, Response, Router } from 'express';
import Movie from '../models/movie';
import { routes } from '../utils/constants';

class MovieDtoImpl implements MovieDto {
  imdbId!: string;

  title!: string;

  image!: string;

  constructor(imdbId: string, title: string, image: string) {
    this.imdbId = imdbId;
    this.title = title;
    this.image = image;
  }

  static fromEntity({ imdbId, title, image }: MovieEntity) {
    return new MovieDtoImpl(imdbId, title, image);
  }
}

function getMoviesService(data): MovieDto[] {
  return data.map(MovieDtoImpl.fromEntity);
}

const findMovies = async (_req: Request, res: Response) => {
  const favoriteMovies = await Movie.find({});
  const data = getMoviesService(favoriteMovies);
  res.status(200).send(data);
};

const moviesRouter = Router();

moviesRouter.get(routes.favoriteMovies, findMovies);

moviesRouter.post(routes.favoriteMovies, async (req: Request, res: Response) => {
  if (!req.body.imdbId || !req.body.image || !req.body.title) {
    res.status(400).json({
      message: 'Error. Data for saving hasn`t been transferred.',
    });
  }
  const movie = new Movie({
    imdbId: req.body.imdbId,
    title: req.body.title,
    image: req.body.image,
  });
  await movie.save();
  res.status(200).json({
    message: 'ok',
  });
});

moviesRouter.delete(routes.favoriteMovies, async (req, res) => {
  if (typeof req.body.imdbId !== 'string') {
    res.status(400).json({
      message: 'Error. Invalid id',
    });
  }
  const result = await Movie.deleteOne({ imdbId: req.body.imdbId });
  if (result.deletedCount > 0) {
    res.status(200).json({
      message: 'ok',
    });
  }
  res.status(500).json({
    message: 'Error. Try again',
  });
});

export default moviesRouter;
