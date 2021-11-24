import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import moviesRouter from './routes/movies';
import { PORT, uri } from './utils/constants';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(moviesRouter);

async function start(): Promise<void> {
  try {
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
