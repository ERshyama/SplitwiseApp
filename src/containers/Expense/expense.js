import React, { Component } from "react";
import UserExpenseContainer from "./userExpenseContainer";
import GroupExpenseContainer from './groupExpenseContainer';
import Dropdown from "../../components/UI/dropdown";

class Expense extends Component {
  state = {
    splitWith: "Split With?",
  };

  finalExpenseDisplay = () => {
    const localSplitHow = this.state.splitWith;
    let returnVal = null;
    if (localSplitHow === "Split With?") {
      returnVal = (
        <Dropdown
          title={localSplitHow}
          size="lg"
          handleSelect={(eventId) => this.setState({ splitWith: eventId })}
        >
          {["Single User", "Group"]}
        </Dropdown>
      );
    } else if (localSplitHow === "Single User") {
      returnVal = (
        <UserExpenseContainer />
      );
    } else {
      returnVal = (
        <GroupExpenseContainer />
      );
    }

    return returnVal;
  };

  render() {
    return <React.Fragment>{this.finalExpenseDisplay()}</React.Fragment>;
  }
}


export default Expense;
