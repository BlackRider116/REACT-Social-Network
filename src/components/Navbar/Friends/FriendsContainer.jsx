import {connect} from "react-redux"
import Friends from './Friends';

const mapStateToProps = state => {
    return {
      friends: state.friendsPage.friends
    };
  };

const FriendsContainer = connect (mapStateToProps) (Friends)

export default FriendsContainer