import React from "react";
import classes from "./../Friends.module.css";

const FriendsOnline = props => {
  //   console.log(props.name);
  return (
    <div className={classes.item}>
      <img alt='FriendsOnline' src={props.state.src} />
      <div className={classes.item}>{props.state.name}</div>
    </div>
  );
};

export default FriendsOnline;
