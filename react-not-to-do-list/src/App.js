// import logo from './logo.svg';
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import "./App.css";
import { AddForm } from "./components/form/AddForm";
import { TaskList } from "./components/task-list/TaskList";
import { BadList } from "./components/task-list/BadList";
import { Title } from "./components/title/Title";
import {
  deleteTasks,
  fetchAllTasks,
  postTask,
  updateTask,
} from "./helpers/axiosHelper";

const weeklyHrs = 24 * 7;

const App = () => {
  // 2. State to store all the task Lists values, we create a function addToTaskList
  const [taskList, setTaskList] = useState([]);

  // 5.2 Add the item in the bad list, we create a state for the bad list
  // const [badList, setBadList] = useState([]);

  //
  const [response, setResponse] = useState({
    status: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [ids, setIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await fetchAllTasks();

    result?.status === "success" && setTaskList(result.result);
    console.log(result);
  };

  const badList = taskList.filter((item) => item.taskType === "badList");
  const entryList = taskList.filter((item) => item.taskType === "taskList");

  const ttlHrBadList = badList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  const ttlHrEntryList = entryList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  const totalHrs = ttlHrBadList + ttlHrEntryList;

  // 9. Alert when delete is clicked

  // const deleteTask = (_id) => {
  //   if (window.confirm("Are you sure you want to delete this task?")) {
  //     console.log(_id);
  //   }
  // }; //We invoke this function in removeFromTaskList and removeFromBadList

  // 4. Remove item from the task list when the delete button is clicked

  // ids is an array
  const removeFromTaskList = async (ids) => {
    // const shouldDelete = deleteTask();
    // if (deleteTask()) {
    //   const filteredArg = taskList.filter((item, index) => {
    //     return index !== i;
    //   });
    //   setTaskList(filteredArg);
    // }

    if (window.confirm("Are you sure you want to delete this task?")) {
      // console.log(_id);
      const result = await deleteTasks(ids);
      // console.log(result);

      setResponse(result);

      // Refetch all the tasks and set to the state
      result.status === "success"
        ? fetchData() && setIds([])
        : setResponse(result);
    }
  };

  // 6. Removing the item from the Bad List

  const removeFromBadList = (i) => {
    // if (deleteTask()) {
    //   const filteredArg = badList.filter((item, index) => {
    //     return index !== i;
    //   });
    //   setBadList(filteredArg);
    // }
    // if (window.confirm("Are you sure you want to delete this task?")) {
    //   console.log(_id);
    // }
  };

  // 5. Displaying the task on the bad list when the right arrow button is clicked

  const switchTask = async (obj) => {
    const result = await updateTask(obj);
    setResponse(result);
    // console.log(result);

    result.status === "success" && fetchData();
    // 5.1 Get the item to be shifted
    // const item = taskList[i];
    // console.log(item);
    // setBadList([...badList, item]);
    // 5.3 Remove the item from the task list
    // removeFromTaskList(i);
  };

  // 7. Moving a task back to the task List from the Bad List

  const shiftToTaskList = (i) => {
    // const item = badList[i];
    // setTaskList([...taskList, item]);
    // removeFromBadList(i);
  };

  // 8. Total from the Task and Bad List
  // 8.1 Total calculation for the Task List
  // const taskListTotalHr = taskList.reduce((acc, item) => acc + +item.hr, 0);
  // console.log(taskListTotalHr);   // Console shows the hrs concatenating as its a string so we add "+" to the item.hr

  // 8.2 Total calculation for the Bad List
  // const badListTotalHr = badList.reduce((acc, item) => acc + +item.hr, 0);
  // console.log(taskListTotalHr);   // Console shows the hrs concatenating as its a string so we add "+" to the item.hr

  // const ttlHrs = taskListTotalHr + badListTotalHr;

  // const addToTaskList = (newInfo) => {
  //   if (ttlHrs + +newInfo.hr <= weeklyHrs) {
  //     setTaskList([...taskList, newInfo]);
  //   } else {
  //     alert("You have exceeded the weekly limit of " + weeklyHrs + "hrs");
  //   }
  // };

  // We comment the addToTaskList and will integrate it with our back end API
  const addToTaskList = async (newInfo) => {
    if (totalHrs + +newInfo.hr <= weeklyHrs) {
      // Calling the API to send the data to the server
      setIsLoading(true);
      const result = await postTask(newInfo);
      console.log(result);
      setResponse(result);
      setIsLoading(false);

      result?.status === "success" ? fetchData() : setResponse(result);

      // if (result?.status === "success") {
      // Fetch sll the task from the server and give it to the the tasklist state so it will automatically display on the page
      //   const result = await fetchAllTasks();
      //   result?.status === "success" && setTaskList(result.result);
      // }
    } else {
      alert("You have exceeded the weekly limit of " + weeklyHrs + "hrs");
    }
  };

  const handleOnSelectItem = (e) => {
    const { value, checked } = e.target;
    // console.log(e.target.value);

    checked
      ? setIds([...ids, value])
      : setIds(ids.filter((id) => id !== value));
  };

  console.log(taskList);

  return (
    <div className="wrapper">
      {/* We wrap all the components inside the container */}
      <Container>
        {/* Title component */}
        <Title />

        {isLoading && <Spinner animation="border" variant="primary" />}

        {response?.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
        {/* Form component */}
        <AddForm addToTaskList={addToTaskList} />

        <hr />

        {/* Task list component */}

        <Row>
          <Col md="6">
            <TaskList
              taskList={entryList}
              removeFromTaskList={removeFromTaskList}
              // shiftToBadList={shiftToBadList}
              switchTask={switchTask}
              // taskListTotalHr={taskListTotalHr}
              handleOnSelectItem={handleOnSelectItem}
            />
          </Col>
          <Col md="6">
            <BadList
              badList={badList}
              removeFromTaskList={removeFromTaskList}
              // shiftToTaskList={shiftToTaskList}
              switchTask={switchTask}
              // badListTotalHr={badListTotalHr}
              handleOnSelectItem={handleOnSelectItem}
              ttlHrBadList={ttlHrBadList}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            {ids.length > 0 && (
              <Button variant="danger" onClick={() => removeFromTaskList(ids)}>
                Delete selection
              </Button>
            )}
          </Col>
        </Row>

        {/* Total hours calculation */}

        <Row>
          <Col>
            <h3 className="mt-5">The total allocated hours is: {totalHrs}</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

//  Multiple tasks to delete

// 1. Creat an array to hold multiple ids
// 2. On checkbox tick and untick, put the id or remove the id from the array
// 3. Show new delete button for
