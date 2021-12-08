import React, { useRef } from "react";
import Table from "../UI/table";
import Dropdown from "../../components/UI/dropdown";
import classes from "./expense.module.css";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  Button,
  Overlay
} from "react-bootstrap";

const GroupExpense = (props) => {
  const targetExpense = useRef(null);

  return (
    <React.Fragment>
      <Row>
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
          <Dropdown
            title="Select other users"
            size="lg"
            handleSelect={props.onSelect}
          >
            {props.children}
          </Dropdown>
        </Col>
        <Col></Col>
      </Row>
      {props.showTable ? (
        <Row>
          <Col></Col>
          <Table head="User Name" groupUserList={props.groupUserList} />
          <Col></Col>
        </Row>
      ) : null}
      {props.groupUserList.length > 1 ? (
        <React.Fragment>
          <Row>
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
                  id="inlineFormInputGroup"
                  onChange={props.onChangeForGp}
                  ref={targetExpense}
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
                    Please enter a valid integer.
                  </div>
                )}
              </Overlay>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <Form.Label style={{ marginTop: "45px" }}>
                <h5 className={classes.label}>
                  Your Share: Rs {props.currentUserShare}
                </h5>
              </Form.Label>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>

          <Row>
            <Col></Col>
            <Col></Col>
            <Dropdown
              title={props.groupSplitMethod}
              size="lg"
              handleSelect={props.onSelectforSplitter}
            >
              {["Equally", "Manually","Group owes the entire amount equally"]}
            </Dropdown>
            <Col></Col>
            <Col></Col>
          </Row>
        </React.Fragment>
      ) : null}

      {props.showManualSplitter
        ? props.groupUserList.map((currentUser, index) => {
            return (
              <Row key={index} style={{ marginTop: "30px" }}>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col>
                  <Form.Label>
                    <h5 className={classes.label}>
                      Enter amount to be lent to {currentUser}:
                    </h5>
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text>Rs</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      className={classes[props.classForSharedInputArr[index]]}
                      onChange={(event) =>
                        props.onChangeforGpManual(event, index)
                      }
                    />
                  </InputGroup>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            );
          })
        : null}
      <Row>
        <Col></Col>
        <Col></Col>
        <Button
          disabled={!props.submitStatus}
          onClick={props.onClick}
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

export default GroupExpense;
