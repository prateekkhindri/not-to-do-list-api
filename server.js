import express from "express";
const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  res.json({
    message: "You have reached the not to do api server",
  });
});

app.listen(PORT, (error) => {
  error && console.log(error);

  console.log(`Server is running on http://localhost:${PORT}`);
});
