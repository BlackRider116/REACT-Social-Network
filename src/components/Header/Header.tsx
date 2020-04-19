import React from "react";
import styles from "../../styles/Header.module.scss";
import { NavLink } from "react-router-dom";

type PropsType = {
  isAuth: boolean
  login: string | null
  avatar: string | null
  logout: () => void
  setAvatarThunk: () => void
}

const Header: React.FC<PropsType> = props => {
  if (props.isAuth) {
    props.setAvatarThunk();
  }
  return (
    <header className={styles.header}>
      <div className={styles.logotype}>
        <img
          alt="Logotype"
          src="https://liputan60.files.wordpress.com/2018/02/cropped-00106-3d-company-logo-design-free-logo-online-template-03.png?w=200"
        />
        <span>Social Network</span>
      </div>

      <div style={{ width: "50%", position: "relative" }}>
        <div className={styles.loginBlockPosition}>
          {props.isAuth ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <NavLink to="/profile" className={styles.loginBlockName}>
                <span>{props.login}</span>
                {props.avatar !== null && <img
                  src={props.avatar}
                  alt="ava"
                />}
              </NavLink>
              <div>
                <button className={styles.loginButton} onClick={props.logout}>
                  ВЫЙТИ
                </button>
              </div>
            </div>
          ) : (
              <div className={styles.loginBtn}>
                <NavLink to="/login" activeClassName={styles.active}>
                  ВОЙТИ
              </NavLink>
              </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
