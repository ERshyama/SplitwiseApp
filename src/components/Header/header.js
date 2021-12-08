import React from "react";
import { Container } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import classes from "./header.module.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <Jumbotron fluid>
        <Container>
          <h1 className={classes.headings}>Splitwise-Clone</h1>
        </Container>
      </Jumbotron>
    </React.Fragment>
  );
};

export default Header;
