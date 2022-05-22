import express from "express";
import {
  insertTask,
  readTasks,
  deleteTask,
  deleteMultipleTasks,
  updateTask,
} from "../model/Task.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await readTasks();
  console.log(result);
  res.json({
    status: "success",
    result,
  });
});

router.post("/", async (req, res) => {
  try {
    const result = await insertTask(req.body);
    // console.log(result);

    result?._id
      ? res.json({
          status: "success",
          message: "Task has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to insert task, please try again",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
  // console.log(req.body);
});

router.patch("/", async (req, res) => {
  const { _id, taskType } = req.body;

  const result = await updateTask({ _id }, { taskType });

  console.log(result);

  result?._id
    ? res.json({
        status: "success",
        message: "Task has been updated",
      })
    : res.json({
        status: "Error",
        message: "Unable to update task, please try again later",
      });
});

// router.delete("/:_id", async (req, res) => {
router.delete("/", async (req, res) => {
  // console.log(req.params._id);

  // const result = await deleteTask(req.params._id);
  // console.log(result);
  const ids = req.body;
  const { deletedCount } = await deleteMultipleTasks(ids);
  // console.log(result);

  deletedCount
    ? res.json({
        status: "success",
        message: "Selected task has been deleted",
      })
    : res.json({
        status: "error",
        message: "Invalid response",
      });
});

export default router;
