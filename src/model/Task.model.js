import TaskSchema from "./Task.schema.js";

// Queries

// Insert Task
export const insertTask = (taskObj) => {
  return TaskSchema(taskObj).save();
};

// Read Tasks
// const readTasks = () => {
//   return TaskSchema.find();
// };

// Delete Task
