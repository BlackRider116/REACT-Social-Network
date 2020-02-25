import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = props => {
  // debugger
  const logout = () => {
    props.logout();
  };

  return (
    <header className={classes.header}>
      <img
        alt="Logotype"
        src="https://liputan60.files.wordpress.com/2018/02/cropped-00106-3d-company-logo-design-free-logo-online-template-03.png?w=200"
      />
      <div className={classes.loginBlockPosition}>
        {props.isAuth ? (
          <div className={classes.loginBlockName}>
            {`${props.login}   `}
            <button onClick={logout} className={classes.loginBlockButton}>
              LOGOUT
            </button>
          </div>
        ) : (
          <div className={classes.loginBlock}>
            <NavLink to="/login">LOGIN</NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
