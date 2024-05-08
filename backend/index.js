import express from "express";
import { PORT, MONGO_DB } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/book_model.js";
import booksRoute from './routes/books_route.js';
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
});

//middleware for handling CORS Policy
//Option 1: Allow all origins with default of cors()

app.use(cors());

//option 2: allow custom origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"]
//     })
// )


app.use("/books", booksRoute);

mongoose
  .connect(MONGO_DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is listenin on port: ${PORT}`);
    });
    console.log("App connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
