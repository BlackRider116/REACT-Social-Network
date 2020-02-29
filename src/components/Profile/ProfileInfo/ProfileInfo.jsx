import React, { useState } from "react";
import avatarDefault from "../../../assets/image/avatarDefault.jpg";
import ProfileStatus from "./ProfileStatus";
import classes from "./ProfileInfo.module.css";
import ProfileUserInfo from "./ProfileUserInfo";

const ProfileInfo = props => {
  const photoSelected = e => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const[stateProfile, setStateProfile] = useState(props.profile)

  const onSubmit = formData => {
    if (formData !== stateProfile) {
      setStateProfile(formData)
      props.saveProfile(formData);
    }
  };

  return (
    <div>
      <div className={classes.item}>
        <img
          className={classes.avatar}
          src={
            props.profile.photos.small !== null
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
      <ProfileUserInfo
        {...props}
        saveProfile={props.saveProfile}
        onSubmit={onSubmit}
        initialValues={props.profile}
      />
    </div>
  );
};
export default ProfileInfo;
