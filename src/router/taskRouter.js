import express from "express";
import { insertTask } from "../model/Task.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello get response",
  });
});

router.post("/", async (req, res) => {
  console.log(req.body);

  const result = await insertTask(req.body);
  console.log(result);
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
