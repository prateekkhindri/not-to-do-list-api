import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello get response",
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({
    message: "Hello post response",
  });
});

router.patch("/", (req, res) => {
  res.json({
    message: "Hello patch response",
  });
});

router.delete("/", (req, res) => {
  res.json({
    message: "Hello delete response",
  });
});

export default router;
