import React from "react";
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../../common/Preloader/Preloader";


const Profile = props => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={classes.content}>
      <ProfileInfo {...props} isOwner={props.isOwner} savePhoto={props.savePhoto} saveProfile={props.saveProfile} status={props.status} updateUserStatus={props.updateUserStatus}/>
      <MyPostsContainer state={props.state} dispatch={props.dispatch}/>
    </div>
  );
};

export default Profile;
