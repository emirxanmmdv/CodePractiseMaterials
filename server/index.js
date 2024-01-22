import express from "express";
import { mongoose } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { productRouter } from "./Routers/productRouter.js";
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())
app.use("/products", productRouter)
const port = 7000;

const PASSWORD = process.env.PASSWORD;
const URL = process.env.URL.replace("<password>", PASSWORD);
const PORT = process.env.PORT

mongoose
  .connect(URL)
  .then(() => console.log("salam ataw!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
