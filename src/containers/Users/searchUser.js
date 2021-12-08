import React, { Component } from "react";
import UserDropdown from "../../components/UI/dropdown";
import { connect } from "react-redux";
import UserCard from "../../components/UI/card";
import Modal from "../../components/UI/modal";

class SearchUser extends Component {
  constructor(props) {
    super(props);
    let modalVal = false;
    let modalContent = "";
    if (this.props.history.prev !== undefined) {
      modalVal = true;
      modalContent = this.props.history.modalContent
      delete this.props.history.prev;
      delete this.props.history.modalContent;
    }
    this.state = {
      showModal: modalVal,
      modContent: modalContent,
      showSearchResult: false,
      userList: Object.keys(this.props.userGraph),
      userExpenseList: null,
      userName: null,
    };
  }

  onSelectHandler = (eventId) => {
    const currUser = this.props.userGraph[eventId.toString()];
    const neighbourObj = currUser["neighbours"];
    const lentStrExpenseList = Object.keys(neighbourObj).map(
      (currNeighbour) => {
        const displayStrLent =
          eventId +
          " has lent Rs " +
          neighbourObj[currNeighbour.toString()] +
          " to " +
          currNeighbour;
        return displayStrLent;
      }
    );

    const borrowedStrExpenseList = [];

    for (let i = 0; i < this.state.userList.length; i++) {
      const currentUser = this.state.userList[i];
      const borrowNeighbourObj =
        this.props.userGraph[currentUser.toString()].neighbours;
      let displayStrBorr = "";
      if (currentUser !== eventId) {
        if (eventId in borrowNeighbourObj) {
          displayStrBorr =
            eventId +
            " has borrowed Rs " +
            borrowNeighbourObj[eventId.toString()] +
            " from " +
            currentUser;
          borrowedStrExpenseList.push(displayStrBorr);
        }
      }
    }

    this.setState({
      userExpenseList: lentStrExpenseList.concat(borrowedStrExpenseList),
      showSearchResult: true,
      userName: eventId,
    });
  };

  onModalCloseHandler = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showModal} title="Operation Completed" handleClose={this.onModalCloseHandler}> {this.state.modContent} </Modal>
        <UserDropdown
          title={"Select User"}
          handleSelect={(eventId) => this.onSelectHandler(eventId)}
          size="lg"
        >
          {this.state.userList}
        </UserDropdown>
        {this.state.showSearchResult ? (
          <UserCard
            expList={this.state.userExpenseList}
            title={"Expense list for " + this.state.userName}
            text={
              "Total individual expense: Rs " +
              this.props.userGraph[this.state.userName.toString()].tExpense
            }
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGraph: state
  };
};

export default connect(mapStateToProps)(SearchUser);
