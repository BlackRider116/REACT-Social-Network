import React from "react";
import classes from "../../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to="/profile" activeClassName={classes.active}>
          Профиль
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs" activeClassName={classes.active}>
          Сообщения
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/news" activeClassName={classes.active}>
          Новости
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/music" activeClassName={classes.active}>
          Музыка
        </NavLink>
      </div>
      <div className={`${classes.item} ${classes.setting}`}>
        <NavLink to="/setting" activeClassName={classes.active}>
          Настройки
        </NavLink>
      </div>
      <div className={`${classes.item} ${classes.setting}`}>
        <NavLink to="/users" activeClassName={classes.active}>
          Пользователи
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar

