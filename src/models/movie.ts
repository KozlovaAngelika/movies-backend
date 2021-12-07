import { Schema, model } from 'mongoose';

const MovieSchema = new Schema(
  {
    imdbId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: false,
    },
    image: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    versionKey: false,
  },
);

const Movie = model<MovieDocument>('Movie', MovieSchema);

export default Movie;
