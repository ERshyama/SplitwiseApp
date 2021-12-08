import React, { Component } from "react";
//import classes from "./App.module.css";
import {Switch, Route, Redirect} from 'react-router';
import Homepage from './containers/Homepage/homepage.js';
import Adduser from './containers/Users/adduser.js'
import GetUserDetails from './containers/Users/getUserDetails';
import Expense from './containers/Expense/expense';
import SettleUp from './containers/Expense/settleUpContainer';
import SearchUser from './containers/Users/searchUser';
import DeleteUser from './containers/Users/deleteUser';



class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/addUser' exact component={Adduser} />
        <Route path='/userDetails' exact component={GetUserDetails} />
        <Route path='/addExpense' exact component={Expense} />
        <Route path='/settleUp' exact component={SettleUp} />
        <Route path='/searchUser' exact component={SearchUser} />
        <Route path='/deleteUser' exact component={DeleteUser} />
        <Redirect to='/' />
      </Switch>
    );
  }
}

export default App;
