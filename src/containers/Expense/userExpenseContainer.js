import React, { Component } from "react";
import UserExpense from "../../components/expense/userExpense";
import { connect } from "react-redux";
import { withRouter } from 'react-router';

class UserExpenseContainer extends Component {
    state = {
        splitHow: "Split How?",
        currentUser: "Who are you?",
        borrower: "No one",
        userList: Object.keys(this.props.userGraph),
        isExpenseInputValid: false,
        isSharedInputValid: false,
        total_expense: null,
        currentUserShare: "0",
        borrowerShare: "0",
        currentUserOwed: "0",
        showManualSplitter: false,
    };

    classForExpenseInput = null;
    classForSharedInput = null;

    validateNumber = (strNumber) => {
        var regExp = new RegExp("^\\d+$");
        var isValid = regExp.test(strNumber);
        return isValid;
    };

    onSelectHandlerForUserAndBorrower = (eventId, type) => {
        let tempArr = Object.keys(this.props.userGraph);
        let index = tempArr.indexOf(eventId);
        let localIndex = 0;
        let tempState = { ...this.state };

        if (type === "User") {
            tempState.currentUser = eventId;
            tempArr.splice(index, 1);
            if (tempState.borrower !== "No one") {
                localIndex = tempArr.indexOf(tempState.borrower);
                tempArr.splice(localIndex, 1);
            }
        } else {
            tempState.borrower = eventId;
            tempArr.splice(index, 1);
            if (tempState.currentUser !== "Who are you?") {
                localIndex = tempArr.indexOf(tempState.currentUser);
                tempArr.splice(localIndex, 1);
            }
        }

        this.setState({
            ...tempState,
            userList: [...tempArr],
        });
    };

    onSelectHandlerForSplitter = (eventId) => {
        let tempState = { ...this.state, userList: [...this.state.userList] };
        if (eventId === "Equally") {
            tempState.currentUserShare = tempState.borrowerShare = (
                Math.round(parseInt(tempState.total_expense) / 2)
            ).toString();
            tempState.isSharedInputValid = true;
            tempState.showManualSplitter = false;
        } else if (eventId === "Manually") {
            tempState.showManualSplitter = true;
            tempState.isSharedInputValid = false;
        } else if (eventId === "You owe the full amount") {
            tempState.isSharedInputValid = true;
            tempState.showManualSplitter = false;
            tempState.currentUserOwed = tempState.total_expense;
        } else {
            tempState.borrowerShare = tempState.total_expense;
            tempState.isSharedInputValid = true;
            tempState.showManualSplitter = false;
        }

        this.setState({
            ...tempState,
            splitHow: eventId,
        });
    };


    onChangeHandler = (event, type) => {
        if (type === "expense") {
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
        } else {
            if (
                this.validateNumber(event.target.value) &&
                parseInt(event.target.value) < parseInt(this.state.total_expense)
            ) 
            {
                const tempCurrentUserShare = (parseInt(this.state.total_expense) - parseInt(event.target.value)).toString()
                this.classForSharedInput = null;
                this.setState({
                    borrowerShare: event.target.value,
                    isSharedInputValid: true,
                    currentUserShare: tempCurrentUserShare
                });
            } else {
                this.classForSharedInput = "formControl";
                this.setState({
                    isSharedInputValid: false,
                });
            }
        }
    };

    submitStatusHandler = () => {
        let returnVal = false;
        if (
            this.state.borrower === "No one" &&
            this.state.isExpenseInputValid &&
            this.state.currentUser !== "Who are you?"
        ) {
            returnVal = true;
        } else if (
            this.state.borrower !== "No one" &&
            this.state.isExpenseInputValid &&
            (this.state.isSharedInputValid ||
                this.state.splitHow === "Equally" ||
                this.state.splitHow === "You owe the full amount" ||
                this.state.splitHow === this.state.borrower + " owes the full amount")
        ) {
            returnVal = true;
        } else {
            returnVal = false;
        }
        return returnVal;
    };


    localOnClickHandlerForUser = () => {
        const newState = {
            currentUser: this.state.currentUser,
            borrower: this.state.borrower,
            currentUserShare:
                this.state.borrower !== "No one"
                    ? this.state.currentUserShare
                    : this.state.total_expense,
            borrowerShare: this.state.borrowerShare,
            splitHow: this.state.splitHow,
            currentUserOwed: this.state.currentUserOwed
        };

        this.props.onClickHandler(newState);
        this.props.history.prev = "/userExpenseContainer";
        this.props.history.modalContent = "The one to one user expense was added successfully, please use the search to confirm.";
        this.props.history.push("/searchUser");
    };


    render() {
        return <React.Fragment><UserExpense
            currentUser={this.state.currentUser}
            borrower={this.state.borrower}
            userList={this.state.userList}
            handleSelectForUser={(eventId) =>
                this.onSelectHandlerForUserAndBorrower(eventId, "User")
            }
            handleSelectForBorrower={(eventId) =>
                this.onSelectHandlerForUserAndBorrower(eventId, "Borrower")
            }
            handleSelectForSplitter={(eventId) =>
                this.onSelectHandlerForSplitter(eventId)
            }
            onChangeHandler={(event) => this.onChangeHandler(event, "expense")}
            onChangeHandlerforManual={(event) =>
                this.onChangeHandler(event, "shared")
            }
            submitStatus={this.submitStatusHandler()}
            onClicked={this.localOnClickHandlerForUser}
            classForExpenseInput={this.classForExpenseInput}
            classForSharedInput={this.classForSharedInput}
            showManualSplitter={this.state.showManualSplitter}
        /></React.Fragment>;
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
            dispatch({ type: "update_expense", expense_obj: expense_obj });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserExpenseContainer));
