import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

export const BadList = ({
  badList,
  removeFromTaskList,
  switchTask,
  ttlHrBadList,
  handleOnSelectItem,
}) => {
  // Responsive using bootstrap - md="6" here is the screen size
  return (
    <div>
      <h2 className="text-center">Bad List</h2>
      <hr />
      <Table striped hover>
        <tbody>
          {badList.map((item, i) => (
            <tr key={item._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  label=""
                  value={item?._id}
                  onClick={handleOnSelectItem}
                />
              </td>
              <td>{item.task}</td>
              <td>{item.hr}</td>
              <td className="text-end">
                {/*This td will have 2 buttons  */}
                <Button
                  variant="warning"
                  onClick={() =>
                    switchTask({ _id: item, taskType: "taskList" })
                  }
                >
                  <i className="fa-solid fa-arrow-left-long"></i>
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => removeFromTaskList([item._id])}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4 className="mt-4 text-danger">
        You could have saved: {ttlHrBadList}hrs
      </h4>
    </div>
  );
};
