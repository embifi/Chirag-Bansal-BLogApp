import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/api/blog-routes.js";
import router from "./routes/api/user-routes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 8000;

mongoose
  .connect(`mongodb+srv://chiragbansal123:mdJbvHm43dPOTjjY@cluster0.lne9m.mongodb.net/test?retryWrites=true&w=majority`)
  .then(() => app.listen(PORT))
  .then(() =>
    console.log(`Connected To Database and listening at PORT ${PORT}`)
  )
  .catch((err) => console.log(err));
