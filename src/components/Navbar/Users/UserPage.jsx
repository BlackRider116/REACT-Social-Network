import React from "react";
import styles from "./Users.module.css";
import avatarDefault from "./../../../assets/image/avatarDefault.jpg";
import { NavLink } from "react-router-dom";

const UserPage = ({ users, deleteFollowThunk, postFollowThunk, ...props }) => {
  return (
    <div>
      {users.map(u => (
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
                    deleteFollowThunk(u.id);
                  }}
                >
                  UNFOLLOW
                </button>
              ) : (
                <button
                  onClick={() => {
                    postFollowThunk(u.id);
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
              <div>
                {u.status ? u.status : "<<<The user did not set the status>>>"}
              </div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserPage;