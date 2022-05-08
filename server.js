import express from "express";
const app = express();

const PORT = 8000;

// Task API endpoints
app.get("/api/v1/tasks", (req, res) => {
  res.json({
    message: "Hello get response",
  });
});

app.post("/api/v1/tasks", (req, res) => {
  res.json({
    message: "Hello post response",
  });
});

app.patch("/api/v1/tasks", (req, res) => {
  res.json({
    message: "Hello patch response",
  });
});

app.delete("/api/v1/tasks", (req, res) => {
  res.json({
    message: "Hello delete response",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "You have reached the not to do api server",
  });
});

app.listen(PORT, (error) => {
  error && console.log(error);

  console.log(`Server is running on http://localhost:${PORT}`);
});
