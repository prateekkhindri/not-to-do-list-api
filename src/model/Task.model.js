import TaskSchema from "./Task.schema.js";

// Queries

// Insert Task
export const insertTask = (taskObj) => {
  return TaskSchema(taskObj).save();
};

// Read Tasks
export const readTasks = () => {
  return TaskSchema.find();
};

// Delete Task

export const deleteTask = (_id) => {
  return TaskSchema.findByIdAndDelete(_id);
};

// Deleting multiple tasks with ids as an array
export const deleteMultipleTasks = (_ids) => {
  return TaskSchema.deleteMany({ _id: { $in: _ids } });
};
