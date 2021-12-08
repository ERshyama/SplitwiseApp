import React, { useRef } from "react";
import Dropdown from "../../components/UI/dropdown";
import classes from "./expense.module.css";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  Button,
  Overlay,
} from "react-bootstrap";

const UserExpense = (props) => {
  const targetExpense = useRef(null);
  const targetShared = useRef(null);

  return (
    <React.Fragment>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
          <Dropdown
            title={props.currentUser}
            handleSelect={props.handleSelectForUser}
            size="lg"
          >
            {props.userList}
          </Dropdown>
        </Col>
        <Col>
          <h5 className={classes.para}>want's to split expense with</h5>
        </Col>
        <Col>
          <Dropdown
            title={props.borrower}
            handleSelect={props.handleSelectForBorrower}
            size="lg"
          >
            {props.userList}
          </Dropdown>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Form.Label>
            <h5 className={classes.label}>Enter Expense:</h5>
          </Form.Label>
          <InputGroup style={{ marginBottom: "10px" }} className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Rs</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              className={classes[props.classForExpenseInput]}
              ref={targetExpense}
              id="inlineFormInputGroup"
              onChange={props.onChangeHandler}
            />
          </InputGroup>
          <Overlay
            target={targetExpense.current}
            show={props.classForExpenseInput  ? true : null}
            placement="right"
          >
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <div
                {...props}
                style={{
                  backgroundColor: "rgba(255, 100, 100, 0.85)",
                  padding: "2px 10px",
                  color: "white",
                  borderRadius: 3,
                  ...props.style,
                }}
              >
                Please enter a valid integer.
              </div>
            )}
          </Overlay>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      {props.borrower !== "No one" ? (
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>

          <Dropdown
            title={"Split Method"}
            handleSelect={props.handleSelectForSplitter}
            size="lg"
          >
            {[
              "Equally",
              "Manually",
              "You owe the full amount",
              props.borrower + " owes the full amount",
            ]}
          </Dropdown>

          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      ) : null}
      {props.showManualSplitter !== false ? (
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Form.Label>
              <h5 className={classes.label}>
                Enter amount to be lent to {props.borrower}:
              </h5>
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>Rs</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className={classes[props.classForSharedInput]}
                id="inlineFormInputGroup"
                onChange={props.onChangeHandlerforManual}
                ref={targetShared}
              />
            </InputGroup>
            <Overlay
              target={targetShared.current}
              show={props.classForSharedInput  ? true : null}
              placement="right"
            >
              {({ placement, arrowProps, show: _show, popper, ...props }) => (
                <div
                  {...props}
                  style={{
                    backgroundColor: "rgba(255, 100, 100, 0.85)",
                    padding: "2px 10px",
                    color: "white",
                    borderRadius: 3,
                    ...props.style,
                  }}
                >
                  Please enter a valid integer and <br />
                  a value less than the total expense.
                </div>
              )}
            </Overlay>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      ) : null}
      <Row>
        <Col></Col>
        <Col></Col>
        <Button
          disabled={!props.submitStatus}
          onClick={props.onClicked}
          className={classes.button}
          variant="primary"
          size="lg"
          block
        >
          Submit
        </Button>
        <Col></Col>
        <Col></Col>
      </Row>
    </React.Fragment>
  );
};

export default UserExpense;
