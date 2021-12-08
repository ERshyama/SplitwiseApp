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

  return (
    <React.Fragment>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
          <Dropdown
            title={props.borrower}
            handleSelect={props.handleSelectForBorrower}
            size="lg"
          >
            {props.userList}
          </Dropdown>
        </Col>
        <Col>
          <h5 className={classes.para}>want's to settle due with</h5>
        </Col>
        <Col>
          <Dropdown
            title={props.lender}
            handleSelect={props.handleSelectForLender}
            size="lg"
          >
            {props.lenderList}
          </Dropdown>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      {props.lender !== "Settle With?" ? (
        <React.Fragment>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <Form.Label style={{marginTop: "20px"}}>
                <h5 className={classes.label}>Enter Amount to be settled:</h5>
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
                show={props.classForExpenseInput ? true : null}
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
                    Please enter a valid integer and <br /> an amount less than
                    or equal <br /> to the owed value
                  </div>
                )}
              </Overlay>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
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
          <Row>
            <h5 style={{ margin: "auto", marginBottom: "25px" }}>OR</h5>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Button
              onClick={props.settleAllClick}
              className={classes.button}
              variant="primary"
              size="lg"
              block
            >
              Settle All
            </Button>
            <Col></Col>
            <Col></Col>
          </Row>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default UserExpense;
