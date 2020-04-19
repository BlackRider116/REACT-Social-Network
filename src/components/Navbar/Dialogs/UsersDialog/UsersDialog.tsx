import React from "react";
import styles from "../../../../styles/Dialogs.module.scss";
import { NavLink } from "react-router-dom";
import avatarDefault from "../../../../assets/image/avatarDefault.jpg";
import { Card } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import Moment from "react-moment";
import { UserInfoType } from "../../../../redux/reducers/reduceDialogs";

type PropsType = {
  usersInfo: Array<UserInfoType> 
  onUserMessages: (userId: number) => void
  openUserDialogsId: number
}

const UsersDialog: React.FC<PropsType> = props => {
  return (
    <Card className={styles.cardDialogs}>
      <Scrollbars style={{ width: "100%", height: "100%" }}>
        {props.usersInfo.map(user => (
          <Card
            key={user.id}
            className={
              props.openUserDialogsId === user.id
                ? `${styles.dialogUser} ${styles.dialogUser_active}`
                : styles.dialogUser
            }
          >
            <div className={styles.dialogUser_Item}>
              <NavLink to={`/profile/${user.id}`}>
                <img
                  alt={'user.id'}
                  src={user.photos.small ? user.photos.small : avatarDefault}
                />
              </NavLink>
              <NavLink
                to={`/dialogs/${user.id}`}
                onClick={() => props.onUserMessages(user.id)}
              >
                <div>{user.userName}</div>

                <div style={{ fontSize: "14px" }}>
                  {"Был(a): "}
                  <Moment
                    format="DD-MM-YYYY HH:mm"
                    style={{ fontSize: "12px" }}
                  >
                    {user.lastUserActivityDate}
                  </Moment>
                </div>
                {user.hasNewMessages && (
                  <span
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                      color: "red"
                    }}
                  >
                    Новых сообщений: {user.newMessagesCount}
                  </span>
                )}
              </NavLink>
            </div>
          </Card>
        ))}
      </Scrollbars>
    </Card>
  );
};

export default UsersDialog;
