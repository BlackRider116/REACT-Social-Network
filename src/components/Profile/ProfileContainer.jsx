import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Profile from "./Profile";
import { getProfileThunk } from "../../redux/reduceProfile";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    this.props.getProfileThunk(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profilePage.profile
  };
};

const UserProfileId = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getProfileThunk })(UserProfileId);
