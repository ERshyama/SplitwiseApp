import React from "react";
import classes from "./input.module.css";
import { Form } from "react-bootstrap";

const InputField = (props) => {
  return (
    <React.Fragment>
      <h3 className={classes.h3}>Enter the user's name</h3>
      <Form.Group className={classes.input}>
        <Form.Control onChange={props.onChangeFunc} size="lg" type="text" />
      </Form.Group>
    </React.Fragment>
  );
};

export default React.memo(InputField);
