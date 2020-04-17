import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import Profile from "./Profile";
import {
  getProfileThunk,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile,
  actionsProfile,
  onFollowThunk,
} from "../../redux/reducers/reduceProfile";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { startDialogThunk } from "../../redux/reducers/reduceDialogs";

class ProfileContainer extends React.Component {
  userProfileId() {
    let userId = this.props.match.params.userId;
    if (!userId && this.props.isAuth) {
      userId = this.props.authUserId;
    }
    if (!userId && !this.props.isAuth) {
      this.props.history.push("/login");
    }
    this.props.getProfileThunk(userId);
    this.props.getUserStatus(userId);
  }

  componentDidMount() {
    this.userProfileId();
  }

  componentDidUpdate(prevState) {
    if (this.props.match.params.userId !== prevState.match.params.userId) {
      this.userProfileId();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
        profileUpdateSuccess={this.props.profileUpdateSuccess}
        startDialogThunk={this.props.startDialogThunk}
        isFollow={this.props.isFollow}
        onFollowThunk={this.props.onFollowThunk}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    profileUpdate: state.profilePage.profileUpdate,
    isFollow: state.profilePage.isFollow,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  };
};

export default compose(
  connect(mapStateToProps, {
    getProfileThunk,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
    profileUpdateSuccess: actionsProfile.profileUpdateSuccess,
    startDialogThunk,
    onFollowThunk
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
