export const updateExpenseHandler = (state, action) => {
  let tempState = JSON.parse(JSON.stringify(state));
  const borrower = action.expense_obj.borrower;
  const currentUser = action.expense_obj.currentUser;
  const currentUserShare = parseInt(action.expense_obj.currentUserShare);
  const borrowerShare = parseInt(action.expense_obj.borrowerShare);
  let borrowerNeighbours = null;
  let currentUserNeighbours = null;
  let tempShare = 0;

  if (action.expense_obj.splitHow !== "Split How?") {
    borrowerNeighbours = tempState[borrower].neighbours;
    currentUserNeighbours = tempState[currentUser].neighbours;

    if (action.expense_obj.currentUserOwed !== "0") {
      let currentUserOwed = parseInt(action.expense_obj.currentUserOwed);
      if (borrower in currentUserNeighbours) {
        if (
          currentUserOwed > parseInt(currentUserNeighbours[borrower])
        ) {
          tempShare =
            currentUserOwed -
            parseInt(currentUserNeighbours[borrower]);
          borrowerNeighbours[currentUser] = tempShare.toString();
          delete currentUserNeighbours[borrower];
        } else if (
          currentUserOwed ===
          parseInt(currentUserNeighbours[borrower])
        ) {
          delete currentUserNeighbours[borrower];
        } else {
          tempShare =
            parseInt(currentUserNeighbours[borrower]) -
            currentUserOwed;
          currentUserNeighbours[borrower] = tempShare.toString();
        }
      } else if (currentUser in borrowerNeighbours) {
        borrowerNeighbours[currentUser] = (
          parseInt(borrowerNeighbours[currentUser]) + currentUserOwed
        ).toString();
      } else {
        borrowerNeighbours[currentUser] = currentUserOwed.toString();
      }
    } else if (currentUser in borrowerNeighbours) {
      if (
        borrowerShare > parseInt(borrowerNeighbours[currentUser])
      ) {
        tempShare =
          borrowerShare - parseInt(borrowerNeighbours[currentUser]);
        delete borrowerNeighbours[currentUser];
        currentUserNeighbours[borrower] = tempShare.toString();
      } else if (
        borrowerShare < parseInt(borrowerNeighbours[currentUser])
      ) {
        tempShare =
          parseInt(borrowerNeighbours[currentUser]) - borrowerShare;
        borrowerNeighbours[currentUser] = tempShare.toString();
      } else {
        delete borrowerNeighbours[currentUser];
      }
    } else {
      currentUserNeighbours[borrower] = (
        (isNaN(parseInt(currentUserNeighbours[borrower]))
          ? 0
          : parseInt(currentUserNeighbours[borrower])) +
        borrowerShare
      ).toString();
    }
  }

  tempState[currentUser].tExpense = (
    parseInt(tempState[currentUser].tExpense) + currentUserShare
  ).toString();

  return tempState;
};

export const groupExpenseHandler = (state, action) => {
  let tempState = JSON.parse(JSON.stringify(state));
  const groupUserList = action.expense_obj.groupUserList;
  const groupSplitMethod = action.expense_obj.groupSplitMethod;
  let borrowerShareArr = null;
  let tempShare = 0;

  if (
    groupSplitMethod === "Equally" ||
    groupSplitMethod === "Group owes the entire amount equally"
  ) {
    borrowerShareArr = groupUserList.map(() => {
      return action.expense_obj.eqBorrowerShare;
    });
  } else {
    borrowerShareArr = action.expense_obj.borrowerShareArr;
  }

  const currentUser = action.expense_obj.currentUser;
  const currentUserShare = parseInt(action.expense_obj.currentUserShare);
  const currentUserNeighbours = tempState[currentUser].neighbours;

  groupUserList.forEach((currentBorrower, index) => {
    let borrowerNeighbours = tempState[currentBorrower].neighbours;

    if (currentUser in borrowerNeighbours) {
      if (
        parseInt(borrowerShareArr[index]) >
        parseInt(borrowerNeighbours[currentUser])
      ) {
        tempShare =
          parseInt(borrowerShareArr[index]) -
          parseInt(borrowerNeighbours[currentUser]);
        delete borrowerNeighbours[currentUser];
        currentUserNeighbours[currentBorrower] = tempShare.toString();
      } else if (
        parseInt(borrowerShareArr[index]) <
        parseInt(borrowerNeighbours[currentUser])
      ) {
        tempShare =
          parseInt(borrowerNeighbours[currentUser]) -
          parseInt(borrowerShareArr[index]);
        borrowerNeighbours[currentUser] = tempShare.toString();
      } else {
        delete borrowerNeighbours[currentUser];
      }
    } else {
      currentUserNeighbours[currentBorrower] = (
        (isNaN(parseInt(currentUserNeighbours[currentBorrower]))
          ? 0
          : parseInt(currentUserNeighbours[currentBorrower])) +
        parseInt(borrowerShareArr[index])
      ).toString();
    }
  });

  tempState[currentUser].tExpense = (
    parseInt(tempState[currentUser].tExpense) + currentUserShare
  ).toString();

  return tempState;
};

export const settleUpHandler = (state, action) => {
  let tempState = JSON.parse(JSON.stringify(state));

  const borrower = action.expense_obj.borrower;
  const lender = action.expense_obj.lender;
  const currentSettleAmt = parseInt(action.expense_obj.currentSettleAmt);
  const totalSettleAmt = parseInt(action.expense_obj.totalSettleAmt);

  if (currentSettleAmt < totalSettleAmt) {
    tempState[lender].neighbours[borrower] = (
      totalSettleAmt - currentSettleAmt
    ).toString();
  } else {
    delete tempState[lender].neighbours[borrower];
  }

  return tempState;
};

export const settleAllHandler = (state, action) => {
  let tempState = JSON.parse(JSON.stringify(state))
  const borrower = action.expense_obj.borrower;
  const lender = action.expense_obj.lender;

  delete tempState[lender].neighbours[borrower]

  return tempState;
}

export const deleteUserHandler = (state, action) => {
  let temporaryState = JSON.parse(JSON.stringify(state));
  delete temporaryState[action.delete_username];

  for (let key in temporaryState) {
    if (action.delete_username in temporaryState[key].neighbours) {
      delete temporaryState[key].neighbours[action.delete_username];
    }
  }

  return temporaryState;
};
