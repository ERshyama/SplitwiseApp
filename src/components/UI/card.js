import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Holder from '../../assets/logo-dark.png'
import classes from './card.module.css';

const UserCard = (props) => {

  const expenseList = props.expList.map((listItem, index) => {
    return (
      <ListGroupItem key={index}>
        {listItem}
      </ListGroupItem>
    )
  })

  return (
    <React.Fragment>
      <Card style={{ width: "18rem" }} className={classes.card}>
        <Card.Img variant="top" src={Holder} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.text}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {expenseList}
        </ListGroup>
      </Card>
    </React.Fragment>
  );
};

export default React.memo(UserCard);
