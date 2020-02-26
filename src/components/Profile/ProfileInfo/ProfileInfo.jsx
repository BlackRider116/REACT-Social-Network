import classes from "./ProfileInfo.module.css";
import React from "react";
import Preloader from "../../../common/Preloader/Preloader";
import avatarDefault from "../../../assets/image/avatarDefault.jpg";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = props => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={classes.item}>
        <img
          src={
            props.profile.photos.large !== null
              ? props.profile.photos.large
              : avatarDefault
          }
          alt="AvaPhoto"
        />
      </div>
      <ProfileStatus {...props} status={props.status} updateUserStatus={props.updateUserStatus}/>
    </div>
  );
};
export default ProfileInfo;
