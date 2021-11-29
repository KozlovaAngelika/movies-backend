import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import moviesRouter from './routes/movies';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const uri = `mongodb+srv://Movie:${process.env.KEY}@cluster0.jqsgi.mongodb.net/Movies`;

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
