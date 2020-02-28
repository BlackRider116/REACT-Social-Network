import React from "react";
import Preloader from "../../../common/Preloader/Preloader";
import avatarDefault from "../../../assets/image/avatarDefault.jpg";
import ProfileStatus from "./ProfileStatus";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = props => {
  if (!props.profile) {
    return <Preloader />;
  }

  const photoSelected = e => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className={classes.item}>
        <img
          className={classes.avatar}
          src={
            props.profile.photos.large !== null
              ? props.profile.photos.large
              : avatarDefault
          }
          alt="AvaPhoto"
        />
        {!props.isOwner && <input type={"file"} onChange={photoSelected} />}
      </div>
      <ProfileStatus
        {...props}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
    </div>
  );
};
export default ProfileInfo;
