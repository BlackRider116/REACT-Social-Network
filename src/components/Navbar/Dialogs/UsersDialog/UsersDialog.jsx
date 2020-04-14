import React from "react";
import styles from "../../../../styles/Dialogs.module.scss";
import { NavLink } from "react-router-dom";
import avatarDefault from "../../../../assets/image/avatarDefault.jpg";
import { Card } from "react-bootstrap";

const UsersDialog = props => {
  // console.log(props.userInfo);
  return (
    <>
      {props.userInfo.map(user => (
        <Card key={user.id} className={styles.dialogUser}>
            <NavLink to={`/profile/${user.id}`}>
              <img
                alt={user.id}
                src={user.photos.small ? user.photos.small : avatarDefault}
              />
            </NavLink>
            <NavLink
              to={`/dialogs/${user.id}`}
              activeClassName={styles.activeName}
            >
              <div onClick={() => props.userMessages(user.id)}>
                {user.userName}
              </div>
            </NavLink>
        </Card>
      ))}
    </>
  );
};

export default UsersDialog;
