import { Request, Response, Router } from 'express';
import Movie from '../models/movie';

const moviesRouter = Router();

moviesRouter.get('/favoriteMovies', async (_req: Request, res: Response) => {
  try {
    const favoriteMovies = await Movie.find({});
    res.status(200).send(favoriteMovies);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

moviesRouter.post('/favoriteMovies', async (req: Request, res: Response) => {
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
