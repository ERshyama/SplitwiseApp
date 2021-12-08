import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import UserCard from "../../components/UI/card";
import { Row, Col } from "react-bootstrap";
import classes from "./getUserDetails.module.css";

class GetUserDetails extends Component {
  render() {
    const userList = Object.keys(this.props.userGraph);

    const displayElementList = userList.map((currentVal, index) => {
      const neighbourObj =
        this.props.userGraph[currentVal.toString()].neighbours;
      const lentStrExpenseList = Object.keys(neighbourObj).map(
        (currNeighbour) => {
          const displayStrLent =
            currentVal +
            " has lent Rs " +
            neighbourObj[currNeighbour.toString()] +
            " to " +
            currNeighbour;
          return displayStrLent;
        }
      );

      const borrowedStrExpenseList = [];
      for (let i = 0; i < userList.length; i++) {
        const currentUser = userList[i];
        const borrowNeighbourObj =
          this.props.userGraph[currentUser.toString()].neighbours;
        let displayStrBorr = "";
        if (currentUser !== currentVal) {
          if (currentVal in borrowNeighbourObj) {
            displayStrBorr =
              currentVal +
              " has borrowed Rs " +
              borrowNeighbourObj[currentVal.toString()] +
              " from " +
              currentUser;
            borrowedStrExpenseList.push(displayStrBorr);
          }
        }
      }

      const expenseList = lentStrExpenseList.concat(borrowedStrExpenseList);

      return (
        <div key={index}>
          <UserCard
            expList={expenseList}
            title={"Expense list for " + currentVal}
            text={
              "Total individual expense: Rs " +
              this.props.userGraph[currentVal.toString()].tExpense
            }
          />
        </div>
      );
    });

    while(displayElementList.length % 3 !== 0){
      displayElementList.push("");
    }

    let i,j,tempArr,chunk = 3;

    let subDisplayElementList = [];

    for (i = 0, j = displayElementList.length; i < j; i += chunk) {
      tempArr = displayElementList.slice(i, i + chunk);
      subDisplayElementList.push(tempArr);
    }


    const rowArr = subDisplayElementList.map((currentRow, rowIndex) => {
      let rowElement = (
        <Row className={classes.row} key={rowIndex}>
          {currentRow.map((currentColumn, colIndex) => {
            return <Col key={colIndex}>{currentColumn}</Col>;
          })}
        </Row>
      );
      return rowElement
    });

    return (
      <div>{rowArr}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGraph: state,
  };
};

export default connect(mapStateToProps)(GetUserDetails);
