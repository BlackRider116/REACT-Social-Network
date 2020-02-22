import Navbar from "./Navbar";
import {connect} from "react-redux"

// const NavbarContainer = props => {
//   let friend = props.state.friends.map(p => <FriendsOnline state={p} />);
//   friend.length = 6;
//   return (
//     <nav className={classes.nav}>
//       <div className={classes.item}>
//         <NavLink to="/profile" activeClassName={classes.active}>
//           Profile
//         </NavLink>
//       </div>
//       <div className={classes.item}>
//         <NavLink to="/dialogs" activeClassName={classes.active}>
//           Messages
//         </NavLink>
//       </div>
//       <div className={classes.item}>
//         <NavLink to="/news" activeClassName={classes.active}>
//           News
//         </NavLink>
//       </div>
//       <div className={classes.item}>
//         <NavLink to="/music" activeClassName={classes.active}>
//           Music
//         </NavLink>
//       </div>
//       <div className={`${classes.item} ${classes.setting}`}>
//         <NavLink to="/setting" activeClassName={classes.active}>
//           Setting
//         </NavLink>
//       </div>
//       <div className={`${classes.item} ${classes.setting}`}>
//         <NavLink to="/friends" activeClassName={classes.active}>
//           Friends
//         </NavLink>
//       </div>
//       <div className={classes.friend}>{friend}</div>
//     </nav>
//   );
// };

const mapStateToProps = state => {
  // debugger
  return {
    friends: state.friendsPage.friends
  };
};

const NavbarContainer = connect(mapStateToProps) (Navbar);

export default NavbarContainer;
