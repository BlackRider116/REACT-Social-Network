import React from "react";
import classes from "../../../../styles/Dialogs.module.scss";
import { NavLink } from "react-router-dom";
import avatarDefault from "../../../../assets/image/avatarDefault.jpg";

const UsersDialog = props => {
  const user = props.userInfo;

  return (
    <div className={`${classes.user} ${classes.dialogItem}`}>
      <NavLink to={`/profile/${user.id}`}>
        <img
          alt={user.id}
          src={user.photos.small ? user.photos.small : avatarDefault}
        />
      </NavLink>
      <NavLink to={`/dialogs/${user.id}`} activeClassName={classes.active}>
        <div onClick={() => props.userMessages(user.id)}>{user.userName}</div>
      </NavLink>
    </div>
  );
};

export default UsersDialog;
