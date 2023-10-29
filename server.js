import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/database.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use("/api/v1", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server Running On Port ${process.env.PORT}`);
});
