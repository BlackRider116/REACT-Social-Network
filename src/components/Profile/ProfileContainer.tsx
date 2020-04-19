import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "redux";
import Profile from "./Profile";
import {
  getProfileThunk,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile,
  onFollowThunk,
  ProfileType,
} from "../../redux/reducers/reduceProfile";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { startDialogThunk } from "../../redux/reducers/reduceDialogs";
import { GlobalStateType } from "../../redux/reduxStore";

type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<{userId: string}>

class ProfileContainer extends React.Component<PropsType> {
  userProfileId() {
    const userId = this.props.match.params.userId

    if (this.props.isAuth) {
      if (!userId) {
        if (this.props.authUserId !== null) {
          this.props.getProfileThunk(this.props.authUserId)
          this.props.getUserStatus(this.props.authUserId)
        }
      } else {
        this.props.getProfileThunk(Number(userId))
        this.props.getUserStatus(Number(userId))
      }
    }
  }

  componentDidMount() {
    this.userProfileId();
  }

  componentDidUpdate(prevState: PropsType) {
    if (this.props.match.url !== prevState.match.url) {
      this.userProfileId();
    }

  }

  render() {
    return (
      <Profile
        isOwner={Number(this.props.match.params.userId)}
        profile={this.props.profile}
        status={this.props.status}
        profileUpdate={this.props.profileUpdate}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
        startDialogThunk={this.props.startDialogThunk}
        isFollow={this.props.isFollow}
        onFollowThunk={this.props.onFollowThunk}
      />
    );
  }
}


type MapStateToPropsType = {
  profile: ProfileType | null
  status: string
  profileUpdate: boolean | null
  isFollow: boolean
  authUserId: number | null
  isAuth: boolean
}
const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    profileUpdate: state.profilePage.profileUpdate,
    isFollow: state.profilePage.isFollow,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  };
};
type MapDispatchToPropsType = {
  getProfileThunk: (userId: number) => void
  getUserStatus: (userId:  number) => void
  updateUserStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (formData: ProfileType) => void
  startDialogThunk: (userId: number) => void
  onFollowThunk: (userId: number, isFollow: boolean) => void
}
export default compose<ComponentType<{}>>(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalStateType>(mapStateToProps, {
    getProfileThunk,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
    startDialogThunk,
    onFollowThunk
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
