import React from "react";
import { Table } from "react-bootstrap";
import classes from "./table.module.css";

const UserTable = (props) => {

  const rowList = props.groupUserList.map((currentUser, index) => {
      return (
        <tr key={index}>
        <td>{index + 1}</td>
        <td>{currentUser}</td>
      </tr>
      )
  })      
  return (
    <Table striped bordered hover className={classes.table}>
      <thead>
        <tr>
          <th>User No.</th>
          <th>{props.head}</th>
        </tr>
      </thead>
      <tbody>
        {rowList}
      </tbody>
    </Table>
  );
};

export default UserTable;
