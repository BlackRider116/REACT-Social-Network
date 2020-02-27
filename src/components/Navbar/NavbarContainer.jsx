import Navbar from "./Navbar";
import {connect} from "react-redux"
// import { getProfileThunk } from "../../redux/reduceProfile";


const mapStateToProps = state => {

  return {
    friends: state.friendsPage.friends,
    // authUserId: state.auth.userId,
  };
};

const NavbarContainer = connect(mapStateToProps) (Navbar);

export default NavbarContainer;
