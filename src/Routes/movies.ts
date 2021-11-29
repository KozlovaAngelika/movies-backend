import { Request, Response, Router } from 'express';
import { ObjectId } from 'mongoose';
import Movie from '../models/movie';

interface MovieDto {
  imdbId: string;
  title: string;
  image: string;
}

interface MovieEntity {
  _id: ObjectId;
  imdbId: string;
  title: string;
  image: string;
}

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
  try {
    const favoriteMovies = await Movie.find({});
    const data = getMoviesService(favoriteMovies);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const moviesRouter = Router();

moviesRouter.get('/favoriteMovies', findMovies);

moviesRouter.post('/favoriteMovies', async (req: Request, res: Response) => {
  if (!req.body.length) {
    res.status(400).json({
      message: 'Error. Data for saving hasn`t been transferred.',
    });
  }
  try {
    const movie = new Movie({
      imdbId: req.body.imdbId,
      title: req.body.title,
      image: req.body.image,
    });
    await movie.save();
    res.status(200).json({
      message: 'ok',
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

moviesRouter.delete('/favoriteMovies', async (req, res) => {
  if (typeof req.body.imdbId !== 'string') {
    res.status(400).json({
      message: 'Error. Invalid id',
    });
  }
  try {
    const result = await Movie.deleteOne({ imdbId: req.body.imdbId });
    if (result.deletedCount > 0) {
      res.status(200).json({
        message: 'ok',
      });
    }
    res.status(500).json({
      message: 'Error. Try again',
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

export default moviesRouter;
