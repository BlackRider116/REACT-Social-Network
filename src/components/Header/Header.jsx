import React from "react";
import classes from "../../styles/Header.module.css";
import { NavLink } from "react-router-dom";

const Header = props => {
  return (
    <header className={classes.header}>
      <img
        alt="Logotype"
        src="https://liputan60.files.wordpress.com/2018/02/cropped-00106-3d-company-logo-design-free-logo-online-template-03.png?w=200"
      />
      <span>Social Network</span>
      <div className={classes.loginBlockPosition}>
        {props.isAuth ? (
          <div className={classes.loginBlockName}>
            {`${props.login}   `}
            <button onClick={props.logout} className={classes.loginBlockButton}>
              LOGOUT
            </button>
          </div>
        ) : (
          <div className={classes.loginBlock}>
            <NavLink to="/login" activeClassName={classes.active}>LOGIN</NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
