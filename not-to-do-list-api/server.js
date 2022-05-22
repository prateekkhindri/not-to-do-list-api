import "dotenv/config";

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to Mongodb
import { connectMongoDB } from "./src/config/dbConfig.js";
connectMongoDB();

console.log(process.env);

// Convert incoming json object and making it available in the req object
app.use(express.json());
app.use(cors());

// Task API endpoints

import taskRouter from "./src/router/taskRouter.js";
app.use("/api/v1/tasks", taskRouter);

// Serving static content
import path from "path";
const __dirname = path.resolve();

app.use(
  express.static(path.resolve(__dirname, "./react-not-to-do-list/build"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "./react-not-to-do-list/build", "index.html")
  );
});

// app.get("/", (req, res) => {
//   res.json({
//     message: "You have reached the not to do api server",
//   });
// });

// Making our project available for local host 8000

app.listen(PORT, (error) => {
  error && console.log(error);

  console.log(`Server is running on http://localhost:${PORT}`);
});
