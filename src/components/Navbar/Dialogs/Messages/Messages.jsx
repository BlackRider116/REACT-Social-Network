import React from "react";
import classes from "./../Dialogs.module.css";

let MessagesItems = props => {
  return <div className={classes.message}>{props.message}</div>;
};

export default MessagesItems;
