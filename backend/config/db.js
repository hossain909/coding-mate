import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    console.log("Connection successfull");
  } catch (error) {
    console.log("Connection failed")
  }
}