import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../../common/Preloader/Preloader";

const Profile = props => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <ProfileInfo
        {...props}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        profileUpdateSuccess={props.profileUpdateSuccess}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
