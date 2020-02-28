import React from "react";
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = props => {
  return (
    <div className={classes.content}>
      <ProfileInfo {...props} isOwner={props.isOwner} savePhoto={props.savePhoto} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
      <MyPostsContainer state={props.state} dispatch={props.dispatch}/>
    </div>
  );
};

export default Profile;
