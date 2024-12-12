import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import bookRouter from "./routes/bookRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import ratingRouter from "./routes/ratingRoute.js";
import commentRouter from "./routes/commentRoute.js";
import downloadRouter from "./routes/downloadRoute.js";
import path from "path";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/books", bookRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
console.log("Check-01");
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/comment", commentRouter);
app.use("/api/download", downloadRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// app.use("/images", express.static(path.join(path.dirname(import.meta.url), "uploads", "images")));
// app.use("/books", express.static(path.join(path.dirname(import.meta.url), "uploads", "books")));


app.use("/images", express.static(path.resolve("uploads", "images")));
app.use("/books", express.static(path.resolve("uploads", "books")));

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
