import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  // debugger
  return (
    <header className={classes.header}>
      <img
        alt="Logotype"
        src="https://liputan60.files.wordpress.com/2018/02/cropped-00106-3d-company-logo-design-free-logo-online-template-03.png?w=200"
      />
      <div className={classes.loginBlock}>
        {props.isAuth ? <div className={classes.loginBlockName}>{props.login}</div> : <NavLink to="/login">LOGIN</NavLink> }
      </div>
    </header>
  );
  
};

export default Header;
