import React from "react";
import { Component } from "react";
import Input from "../../components/UI/input";
import { Button } from "react-bootstrap";
import classes from "./adduser.module.css";
import { connect } from 'react-redux';
import Modal from '../../components/UI/modal';
import {withRouter} from 'react-router';

class Adduser extends Component {

  state = {
    inputVal: "",
    showModal: false,
    userList: Object.keys(this.props.userGraph)
  }

  onChangeHandler = (event) => {
    this.setState({
      inputVal: event.target.value
    })
  }

  localOnClickHandler = () => {
    const tempUserList = this.state.userList.map((currentUser) => {
      return currentUser.toLowerCase();
    })
    const tempInputVal = this.state.inputVal.toLowerCase();
    if(tempUserList.indexOf(tempInputVal) === -1){
      this.props.onClickHandler(this.state.inputVal);
      this.props.history.prev = "/addUser"
      this.props.history.push('/')
    }
    else{
      this.setState({
        showModal: true
      })
    }
  }

  onModalCloseHandler = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.showModal} title="User not created" handleClose={this.onModalCloseHandler}> The user already exists. </Modal>
        <Input onChangeFunc = {(event) => this.onChangeHandler(event)}/>
        <Button
          onClick={this.localOnClickHandler}
          className={classes.button}
          variant="primary"
          size="lg"
          block
        >
          Add
        </Button>{" "}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGraph: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickHandler: (name) => {dispatch({"type":"addUser", "key":name})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Adduser));
