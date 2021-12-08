import { updateExpenseHandler, deleteUserHandler, groupExpenseHandler, settleUpHandler, settleAllHandler } from "./actionHandlers";

const initialState = {
  Hrishabh: {
    neighbours: {
      TejPrakash: "1500",
    },
    tExpense: "10000"
  },
  Partha: {
    neighbours: {
      Hrishabh: "6000",
      TejPrakash: "5000",
    },
    tExpense: "10000",
  },
  TejPrakash: {
    neighbours: {
      Prabhakar: "7000",
    },
    tExpense: "10000",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "addUser":
      state[action.key] = { tExpense: "0", neighbours: {} };
      return state;

    case "update_expense":
      return updateExpenseHandler(state, action);

    case "update_group_expense":
      return groupExpenseHandler(state, action);  

    case "delete_user":
      return deleteUserHandler(state, action);

    case "settle_due":
      return settleUpHandler(state, action);  

    case "settle_due_all":
      return settleAllHandler(state, action);  

    default:
      return state;
  }
};

export default reducer;
