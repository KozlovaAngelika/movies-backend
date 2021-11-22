import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import moviesRouter from './Routes/movies';

const PORT = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.KEY}MovieDB@cluster0.jqsgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const app = express();

app.use(moviesRouter);

dotenv.config();

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
