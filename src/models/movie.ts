import { Schema, model } from 'mongoose';

const MovieSchema = new Schema({
  id: {
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
});

const Movie = model<MovieDocument>('Movie', MovieSchema);

export default Movie;
