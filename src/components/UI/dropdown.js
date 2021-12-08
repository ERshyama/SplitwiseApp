import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import classes from "./dropdown.module.css";

const UserDropdown = (props) => {
  const userList = props.children.map((currentUser) => {
    return (
      <Dropdown.Item
        key={currentUser}
        eventKey={currentUser}
        onSelect={props.handleSelect}
      >
        {currentUser}
      </Dropdown.Item>
    );
  });

  return (
    <DropdownButton id="dropdown-basic-button" title={props.title} size={props.size} className={classes.dropdown}>
        {userList}
      </DropdownButton>
  );
};

export default React.memo(UserDropdown);
