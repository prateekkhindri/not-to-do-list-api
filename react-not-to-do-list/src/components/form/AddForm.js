import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const initialState = {
  task: "",
  hr: "",
};

export const AddForm = ({ addToTaskList }) => {
  // Making the form responsive with bootstrap - "g-2" is gap

  // 1. We capture the form data and then pass this function down as a props to the cols
  const [newInfo, setNewInfo] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewInfo({
      ...newInfo,
      [name]: value,
    });
  };
  // console.log(newInfo);             //Check on the console

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addToTaskList(newInfo);
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="g-2">
          <Col md={7}>
            <Form.Control
              placeholder="Task ..."
              name="task"
              required
              onChange={handleOnChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              placeholder="hour"
              type="number"
              name="hr"
              required
              onChange={handleOnChange}
            />
          </Col>
          <Col md={2}>
            {/* <Form.Control placeholder="Zip" /> */}
            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

// 1. Get the form data and store in local state on input field changed (we grab the input value)
// 2.  On form submit send the task data to the parent component to put in the task collections
