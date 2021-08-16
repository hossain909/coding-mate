import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
// router
import postRouter from "./routes/postRoutes.js";

connectDB()
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// post routes
app.use("/posts", postRouter)

app.get("/", (req, res) => {
  res.send("Hello to CodeMate API")
})




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
mongoose.set("useFindAndModify", false)