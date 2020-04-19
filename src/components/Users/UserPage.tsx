import React from "react";
import styles from "../../styles/Users.module.scss";
import avatarDefault from "./../../assets/image/avatarDefault.jpg";
import { NavLink } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { UsersType } from "../../redux/reducers/reduceUsers";

type PropsType = {
  users: Array<UsersType>
  isAuth: boolean
  followUnFollowThunk: (userId: number, boolean: boolean) => void
  startDialogThunk: (userId: number) => void
}

const UserPage: React.FC<PropsType> = props => {
  return (
    <div>
      {props.users.map(user => (
        <Card key={user.id} className={styles.user}>
          <div>
            <NavLink to={`/profile/${user.id}`}>
              <img
                alt="avatarDefault"
                src={
                  user.photos.small !== null ? user.photos.small : avatarDefault
                }
                className={styles.avatar}
              />
            </NavLink>

            {user.followed ? (
              <Button
                variant="outline-danger"
                className={styles.user_followBtn}
                onClick={() => {
                  props.followUnFollowThunk(user.id, user.followed);
                }}
              >
                Отписаться
              </Button>
            ) : (
                <Button
                  variant="outline-success"
                  className={styles.user_followBtn}
                  onClick={() => {
                    props.followUnFollowThunk(user.id, user.followed);
                  }}
                >
                  Подписаться
              </Button>
              )}
          </div>

          <div>
            <h4 style={{ marginTop: '5px' }}> {user.name}</h4>
            <div style={{ fontSize: '17px' }}>sdfgsdfgsdfg{user.status}</div>

            <NavLink to={props.isAuth ? `/dialogs/${user.id}` : "/login"}>
              <Button
                className={styles.user_startMesBtn}
                variant="outline-primary"
                onClick={() => props.isAuth && props.startDialogThunk(user.id)}
              > Написать сообщение </Button>
            </NavLink>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserPage;
