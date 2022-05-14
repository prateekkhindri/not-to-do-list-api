import "dotenv/config";

import express from "express";
const app = express();
const PORT = 8000;

// Connect to Mongodb
import { connectMongoDB } from "./src/config/dbConfig.js";
connectMongoDB();

console.log(process.env);

// Convert incoming json object and making it available in the req object
app.use(express.json());

// Task API endpoints

import taskRouter from "./src/router/taskRouter.js";

app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.json({
    message: "You have reached the not to do api server",
  });
});

// Making our project available for local host 8000
app.listen(PORT, (error) => {
  error && console.log(error);

  console.log(`Server is running on http://localhost:${PORT}`);
});
