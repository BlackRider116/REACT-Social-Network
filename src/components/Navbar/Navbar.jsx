import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import FriendsOnline from "./Friends/FriendsOnline/FriendsOnline";

const Navbar = props => {
  // debugger
  let friendsOnline = props.friends.map(friend => <FriendsOnline state={friend} key={friend.id}/>);
  friendsOnline.length = 6;
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to="/profile" activeClassName={classes.active}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs" activeClassName={classes.active}>
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/news" activeClassName={classes.active}>
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/music" activeClassName={classes.active}>
          Music
        </NavLink>
      </div>
      <div className={`${classes.item} ${classes.setting}`}>
        <NavLink to="/setting" activeClassName={classes.active}>
          Setting
        </NavLink>
      </div>
      <div className={`${classes.item} ${classes.setting}`}>
        <NavLink to="/users" activeClassName={classes.active}>
          Users
        </NavLink>
      </div>
      <div className={`${classes.item}`}>
        <NavLink to="/friends" activeClassName={classes.active}>
          Friends
        </NavLink>
      </div>
      <div className={classes.friend}>{friendsOnline}</div>
    </nav>
  );
};

export default Navbar;
