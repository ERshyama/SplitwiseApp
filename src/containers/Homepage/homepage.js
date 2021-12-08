import React, { Component } from "react";
import Header from "../../components/Header/header.js";
import { Button } from "react-bootstrap";
import classes from "./homepage.module.css";
import { withRouter } from "react-router";
import Modal from '../../components/UI/modal';


class Homepage extends Component {

  constructor(props) {
    super(props);
    let modalVal = false;
    if(this.props.history.prev !== undefined){
      modalVal = true;
    }
    this.state = {
      showModal: modalVal
    }

    delete this.props.history.prev;
  }
  
  addUserOnClickHandler = () => {
    this.props.history.push('/addUser');
  }

  seeUserDetailsHandler = () => {
    this.props.history.push('/userDetails');
  }

  addExpenseHandler = () => {
    this.props.history.push('/addExpense');
  }

  searchUserHandler = () => {
    this.props.history.push('/searchUser');
  }

  settleUpHandler = () => {
    this.props.history.push('/settleUp');
  }

  deleteUserHandler = () => {
    this.props.history.push('/deleteUser');
  }

  onModalCloseHandler = () => {
    this.setState({
      showModal: false
    })
  }
  
  render() {
    
    return (
      <React.Fragment>
        <Modal show={this.state.showModal} title="User created." handleClose={this.onModalCloseHandler}> The user was created successsfully. </Modal>
        <Header />{" "}
        <Button
          onClick={this.addUserOnClickHandler}
          style={{ marginTop: "120px" }}
          className={classes.button}
          variant="primary"
          size="lg"
          block
        >
          Add User
        </Button>
        <Button onClick={this.seeUserDetailsHandler} className={classes.button} variant="primary" size="lg" block>
          View all users
        </Button>
        <Button onClick={this.searchUserHandler} className={classes.button} variant="primary" size="lg" block>
          Search User
        </Button>
        <Button onClick={this.deleteUserHandler} className={classes.button} variant="primary" size="lg" block>
          Delete User
        </Button>
        <Button onClick={this.addExpenseHandler} className={classes.button} variant="primary" size="lg" block>
          Add Expense
        </Button>
        <Button onClick={this.settleUpHandler} className={classes.button} variant="primary" size="lg" block>
          Settle-Up
        </Button>
      </React.Fragment>
    );
  }
}

export default withRouter(Homepage);
