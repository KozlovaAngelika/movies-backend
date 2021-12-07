declare interface MovieDocument extends Document {
  imdbId: string;
  title: string;
  image: string;
}

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
