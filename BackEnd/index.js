import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port ${PORT}`);
});
