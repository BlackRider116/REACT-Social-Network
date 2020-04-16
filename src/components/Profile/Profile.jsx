import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../../common/Preloader/Preloader";
import { Card } from "react-bootstrap";
import styles from '../../styles/Profile.module.scss'

const Profile = props => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <Card className={styles.global} >
      <ProfileInfo
        {...props}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        profileUpdateSuccess={props.profileUpdateSuccess}
        startDialogThunk={props.startDialogThunk}
        isFollow={props.isFollow}
        onFollowThunk={props.onFollowThunk}
      />
      <MyPostsContainer />
    </Card>
  );
};

export default Profile;
