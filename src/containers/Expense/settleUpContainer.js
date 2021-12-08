import React, { Component } from "react";
import SettleUp from "../../components/expense/settleUp";
import { connect } from "react-redux";
import { withRouter } from 'react-router';

class SettleUpContainer extends Component {
    state = {
        userList: Object.keys(this.props.userGraph),
        borrower: "Who Are You?",
        lender: "Settle With?",
        lenderList: [],
        currentSettleAmt: "0",
        totalSettleAmt: "0",
        isExpenseInputValid: false,    
    };

    classForExpenseInput = null;

    validateNumber = (strNumber) => {
        var regExp = new RegExp("^\\d+$");
        var isValid = regExp.test(strNumber);
        return isValid;
    };

    borrowerSelectHandler = (eventId) => {
        const tempLenderList = []
        const tempUserGraph = {...this.props.userGraph}
        for(const user in tempUserGraph){
            if(user === eventId){
                continue;
            }
            if(eventId in tempUserGraph[user.toString()].neighbours){
                tempLenderList.push(user);
            }
        }

        this.setState({
            borrower: eventId,
            lenderList: tempLenderList
        })
    }

    lenderSelectHandler = (eventId) => {
        const tempUserGraph = {...this.props.userGraph}
        const tempBorrower = this.state.borrower
        this.setState({
            lender: eventId, 
            totalSettleAmt: tempUserGraph[eventId.toString()].neighbours[tempBorrower]
        })
    }
 
    onAmtChangeHandler = (event) => {
        if (this.validateNumber(event.target.value)){
            if(parseInt(event.target.value) <= parseInt(this.state.totalSettleAmt)){
                this.classForExpenseInput = null;
                this.setState({
                    currentSettleAmt: event.target.value,
                    isExpenseInputValid: true,
                });
                return;
            }
            
        }
        this.classForExpenseInput = "formControl";
            this.setState({
                isExpenseInputValid: false
            })
    }

    submitStatusHandler = () => {
        if(this.state.isExpenseInputValid){
            return true;
        }   
        return false;
    }

    localOnClickHandler = (type) => {
        let newState = {};
        if(type === "partial"){
            newState = {
                lender: this.state.lender,
                borrower: this.state.borrower,
                currentSettleAmt: this.state.currentSettleAmt,
                totalSettleAmt: this.state.totalSettleAmt
            }
    
            this.props.onClickHandler(newState);
            this.props.history.modalContent = "Partial due settlement completed successfully, please use the search to confirm.";
        }
        else{
            newState = {
                lender: this.state.lender,
                borrower: this.state.borrower,
            }
    
            this.props.settleAllClickHandler(newState);
            this.props.history.modalContent = "Complete due settlement was successfull, please use the search to confirm.";
        }

        this.props.history.prev = "/settleUp";
        this.props.history.push("/searchUser");
    }


    render() {
        return (<React.Fragment>
            <SettleUp 
                borrower={this.state.borrower}
                lender={this.state.lender}
                userList={this.state.userList}
                lenderList={this.state.lenderList}
                classForExpenseInput={this.classForExpenseInput}
                handleSelectForBorrower={(eventId) => this.borrowerSelectHandler(eventId)}
                handleSelectForLender={(eventId) => this.lenderSelectHandler(eventId)}
                onChangeHandler={(event) => this.onAmtChangeHandler(event)}
                submitStatus={this.submitStatusHandler()}
                settleAllClick={() => this.localOnClickHandler("all")}
                onClicked={() => this.localOnClickHandler("partial")}
            />
        </React.Fragment>);
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
            dispatch({ type: "settle_due", expense_obj: expense_obj });
        },
        settleAllClickHandler: (expense_obj) => {
            dispatch({type: "settle_due_all", expense_obj: expense_obj});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SettleUpContainer));
