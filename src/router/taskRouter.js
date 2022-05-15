import express from "express";
import {
  insertTask,
  readTasks,
  deleteTask,
  deleteMultipleTasks,
} from "../model/Task.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await readTasks();
  console.log(result);
  res.json({
    message: "Hello get response",
    result,
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

// router.patch("/", (req, res) => {
//   res.json({
//     message: "Hello patch response",
//   });
// });

// router.delete("/:_id", async (req, res) => {
router.delete("/", async (req, res) => {
  // console.log(req.params._id);

  // const result = await deleteTask(req.params._id);
  // console.log(result);
  const { ids } = req.body;
  const result = await deleteMultipleTasks(ids);
  console.log(result);

  res.json({
    message: "Hello delete response",
    result,
  });
});

export default router;
