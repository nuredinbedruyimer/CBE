import mongoose from "mongoose";
import { dbparameter } from "./dbparameter.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, dbparameter);
    console.log("Connected to database successfully On", conn.connection.host);
  } catch (error) {
    console.log(error);
    console.log("Database connection is Failed!");
  }
};

export default connectDB;
