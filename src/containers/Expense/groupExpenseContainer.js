import React, { Component } from "react";
import { connect } from "react-redux";
import GroupExpense from "../../components/expense/groupExpense";
import { withRouter } from "react-router";

class GroupExpenseContainer extends Component {
  state = {
    currentUser: "Who are you?",
    userList: Object.keys(this.props.userGraph),
    total_expense: null,
    currentUserShare: "0",
    isExpenseInputValid: false,
    isSharedInputValid: false,
    showManualSplitter: false,
    showTable: false,
    groupUserList: [],
    groupSplitMethod: "Split How?",
    borrowerShareArr: [],
    eqBorrowerShare: "0",
  };

  classForExpenseInput = null;
  classForSharedInputArr = [];

  validateNumber = (strNumber) => {
    var regExp = new RegExp("^\\d+$");
    var isValid = regExp.test(strNumber);
    return isValid;
  };

  onChangeHandler = (event) => {
    if (this.validateNumber(event.target.value)) {
      this.classForExpenseInput = null;
      this.setState({
        total_expense: event.target.value,
        isExpenseInputValid: true,
      });
    } else {
      this.classForExpenseInput = "formControl";
      this.setState({
        isExpenseInputValid: false,
      });
    }
  };

  selectHandlerForCurrentUser = (eventId) => {
    let tempArr = Object.keys(this.props.userGraph);
    let index = tempArr.indexOf(eventId);
    let tempState = {
      ...this.state,
      userList: tempArr,
      groupUserList: [...this.state.groupUserList],
      currentUser: eventId,
    };
    tempArr.splice(index, 1);
    this.setState({
      ...tempState,
    });
  };

  onSelectHandlerForGroup = (eventId) => {
    let localGroupUserList = [...this.state.groupUserList];
    let localUserList = [...this.state.userList];
    const index = localUserList.indexOf(eventId);
    localUserList.splice(index, 1);
    this.classForSharedInputArr.push(null);
    localGroupUserList.push(eventId);
    this.setState({
      groupUserList: [...localGroupUserList],
      userList: [...localUserList],
      showTable: true,
    });
  };

  splitHandlerForGroup = (eventId) => {
    const localGroupUserList = [...this.state.groupUserList];
    let eachShare = 0;
    if (eventId === "Equally") {
      eachShare = Math.round(
        parseInt(this.state.total_expense) / (localGroupUserList.length + 1)
      );
      this.setState({
        eqBorrowerShare: eachShare.toString(),
        currentUserShare: eachShare.toString(),
        groupSplitMethod: eventId,
        showManualSplitter: false,
      });
    } else if (eventId === "Group owes the entire amount equally") {
      eachShare = Math.round(
        parseInt(this.state.total_expense) / localGroupUserList.length
      );
      this.setState({
        eqBorrowerShare: eachShare.toString(),
        currentUserShare: "0",
        groupSplitMethod: eventId,
        showManualSplitter: false,
      });
    } else {
      this.setState({
        showManualSplitter: true,
        groupSplitMethod: eventId,
        currentUserShare: "0",
      });
    }
  };

  onChangeHandlerForGpManual = (event, index) => {
    let tempArr = [...this.state.borrowerShareArr];
    tempArr[index] = event.target.value;
    let tot_expense = parseInt(this.state.total_expense);

    let input_valid = false;

    if (this.validateNumber(event.target.value)) {
      let total_sum = tempArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      if (total_sum <= tot_expense) {
        this.classForSharedInputArr[index] = null;
        input_valid = true;
        this.setState({
          borrowerShareArr: [...tempArr],
          isSharedInputValid: input_valid,
          currentUserShare: (tot_expense - total_sum).toString(),
        });
        return;
      }
    }

    this.classForSharedInputArr[index] = "formControl";
    this.setState({
      isSharedInputValid: input_valid,
    });
  };

  submitStatusHandlerForGroup = () => {
    if (
      (this.state.groupSplitMethod === "Equally" ||
        this.state.groupSplitMethod === "Group owes the entire amount equally") &&
      this.state.isExpenseInputValid
    ) {
      return true;
    } else if (
      this.state.groupSplitMethod === "Manually" &&
      this.state.isSharedInputValid && this.state.isExpenseInputValid
    ) {
      return true;
    }
    return false;
  };

  localOnClickHandler = () => {
    const newState = {
      currentUser: this.state.currentUser,
      currentUserShare: this.state.currentUserShare,
      groupUserList: this.state.groupUserList,
      borrowerShareArr: this.state.borrowerShareArr,
      groupSplitMethod: this.state.groupSplitMethod,
      eqBorrowerShare: this.state.eqBorrowerShare,
    };

    this.props.onClickHandler(newState);
    this.props.history.prev = "/groupExpenseContainer";
    this.props.history.modalContent = "The group expense was added successfully, please use the search to confirm.";
    this.props.history.push("/searchUser");
  };

  render() {
    return (
      <React.Fragment>
        {
          <GroupExpense
            groupUserList={this.state.groupUserList}
            userList={this.state.userList}
            currentUser={this.state.currentUser}
            currentUserShare={this.state.currentUserShare}
            showTable={this.state.showTable}
            handleSelectForUser={(eventId) =>
              this.selectHandlerForCurrentUser(eventId)
            }
            onSelect={(eventId) => this.onSelectHandlerForGroup(eventId)}
            onChangeForGp={(event) => this.onChangeHandler(event)}
            onSelectforSplitter={(eventId) =>
              this.splitHandlerForGroup(eventId)
            }
            onChangeforGpManual={this.onChangeHandlerForGpManual}
            submitStatus={this.submitStatusHandlerForGroup()}
            groupSplitMethod={this.state.groupSplitMethod}
            classForExpenseInput={this.classForExpenseInput}
            classForSharedInput={this.classForSharedInput}
            classForSharedInputArr={this.classForSharedInputArr}
            showManualSplitter={this.state.showManualSplitter}
            onClick={this.localOnClickHandler}
          >
            {this.state.userList}
          </GroupExpense>
        }
      </React.Fragment>
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
    onClickHandler: (expense_obj) => {
      dispatch({ type: "update_group_expense", expense_obj: expense_obj });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GroupExpenseContainer));
