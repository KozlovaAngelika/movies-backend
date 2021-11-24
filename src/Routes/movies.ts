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
      id: req.body.id,
      title: req.body.title,
      image: req.body.image,
    });
    await movie.save();
  } catch (e) {
    res.status(500).send(e.message);
  }
});

moviesRouter.delete('/favoriteMovies', async (req, res) => {
  try {
    const result = await Movie.deleteOne({ id: req.body.id });
    if (result.deletedCount > 0) {
      return res.status(200).json({
        message: 'ok',
      });
    }

    return res.status(500).json({
      message: 'Error. Try again',
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
});

export default moviesRouter;
