import React from "react";
import styles from "./Users.module.css";
import avatarDefault from "./../../../assets/image/avatarDefault.jpg";
import { NavLink } from "react-router-dom";

const Users = props => {
  let numberOfPage = Math.ceil(props.totalCount / props.usersCount);
  let pages = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }
  pages.length = 40;

  return (
    <div>
      <div>
        {pages.map(p => {
          return (
            <span
              key={p}
              className={props.numberPage === p ? styles.pageNumber : undefined}
              onClick={() => {
                props.onNumberPage(p);
              }}
            >{` ${p}`}</span>
          );
        })}
      </div>

      {props.users.map(u => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={`/profile/${u.id}`}>
                <img
                  alt="avatarDefault"
                  src={u.photos.small !== null ? u.photos.small : avatarDefault}
                  className={styles.avatar}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.deleteFollowThunk(u.id);
                  }}
                >
                  UNFOLLOW
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.postFollowThunk(u.id);
                  }}
                >
                  FOLLOW
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.cityName"}</div>
              <div>{"u.location.country"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
