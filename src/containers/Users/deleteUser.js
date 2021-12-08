import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../../components/UI/modal";
import UserDropdown from "../../components/UI/dropdown";
import { Button } from "react-bootstrap";
import classes from './deleteUser.module.css';

class DeleteUser extends Component {
  
    state = {
      showModal: false,
      userList: Object.keys(this.props.userGraph),
      userName: "Select User",
      showButton: false
    }
   
  onSelectHandler = (eventId) => {
    this.setState({
        userName: eventId,
        showButton: true
    })
  };

  onClickHandler = () => {
    this.props.onDeleteHandler(this.state.userName);
    const tempArr = Object.keys(this.props.userGraph);
    let index = tempArr.indexOf(this.state.userName);
    tempArr.splice(index, 1);
    this.setState({
        showModal: true,
        userList: tempArr
    })
  }

  onModalCloseHandler = () => {
    this.setState({
      showModal: false,
      showButton: false,
      userName: "Select User"
    });
  };

  render() {
    return (
      <div>
        <Modal
          show={this.state.showModal}
          title="User deleted successfully."
          handleClose={this.onModalCloseHandler}
        >
          {" "}
          The user {this.state.userName} was deleted successfully, please verify by searching.{" "}
        </Modal>
        <UserDropdown
          title={this.state.userName}
          handleSelect={(eventId) => this.onSelectHandler(eventId)}
          size="lg"
        >
          {this.state.userList}
        </UserDropdown>
        {this.state.showButton ? <Button
          onClick={this.onClickHandler}
          className={classes.button}
          variant="primary"
          size="lg"
          block
        >
          Delete User
        </Button> : null}
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGraph: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteHandler: (delete_username) => {
      dispatch({ type: "delete_user", delete_username: delete_username });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);
