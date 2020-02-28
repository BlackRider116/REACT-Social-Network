import Navbar from "./Navbar";
import {connect} from "react-redux"


const mapStateToProps = state => {

  return {
    friends: state.friendsPage.friends,
  };
};

const NavbarContainer = connect(mapStateToProps) (Navbar);

export default NavbarContainer;
