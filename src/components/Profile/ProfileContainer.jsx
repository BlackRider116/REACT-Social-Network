import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Profile from "./Profile";
import {
  getProfileThunk,
  getUserStatus,
  updateUserStatus
} from "../../redux/reduceProfile";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) userId = 2;
    this.props.getProfileThunk(6017);
    this.props.getUserStatus(6017);
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status
  };
};

export default compose(
  connect(mapStateToProps, {
    getProfileThunk,
    getUserStatus,
    updateUserStatus
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
