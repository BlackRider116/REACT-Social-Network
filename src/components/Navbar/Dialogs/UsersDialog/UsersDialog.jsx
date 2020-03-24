import React from "react";
import classes from "../../../../styles/Dialogs.module.css";
import { NavLink } from "react-router-dom";


const UsersDialog = props => {
  // console.log(props.state.id)
  return (
    <div className={`${classes.user} ${classes.dialogItem}`}>
      <NavLink to={`/dialogs/id${props.state.id}`} activeClassName={classes.active}>
        <img alt={props.state.id} src={props.state.src} />
        {props.state.name}
      </NavLink>
    </div>
  );
};

export default UsersDialog;
