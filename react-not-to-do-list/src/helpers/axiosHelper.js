import axios from "axios";

const taskApiEp =
  process.env.NODE_ENV === "production"
    ? "/api/v1/tasks"
    : "http://localhost:8000/api/v1/tasks";
// console.log(process.env.NODE_ENV);

// const taskApiEp =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:8000/api/v1/tasks"
//     : "/api/v1/tasks";

export const postTask = async (taskObj) => {
  // console.log(taskApiEp);
  try {
    const { data } = await axios.post(taskApiEp, taskObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchAllTasks = async () => {
  try {
    const { data } = await axios.get(taskApiEp);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTasks = async (ids) => {
  try {
    const { data } = await axios.delete(taskApiEp, { data: ids });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const updateTask = async (taskObj) => {
  try {
    const { data } = await axios.patch(taskApiEp, taskObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
