import React, { useState, useEffect } from "react";
import avatarDefault from "../../../assets/image/avatarDefault.jpg";
import ProfileStatus from "./ProfileStatus";
import classes from "./ProfileInfo.module.css";
import ProfileInfoForm, { ProfileUserInfo } from "./ProfileUserInfo";

const ProfileInfo = ({ profileUpdate, ...props }) => {
  const photoSelected = e => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const [editMode, setEditMode] = useState(false);

  const onSubmit = formData => {
    if (formData !== props.profile) {
      props.saveProfile(formData);
    } else if (profileUpdate !== false) {
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (profileUpdate === true) {
      setEditMode(false);
    }

  }, [profileUpdate]);

  const onEditMode = () => {
    setEditMode(true);
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
      {!editMode ? (
        <ProfileUserInfo
          onEditMode={onEditMode}
          profile={props.profile}
          isOwner={props.isOwner}
        />
      ) : (
        <ProfileInfoForm
          {...props}
          onSubmit={onSubmit}
          initialValues={props.profile}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
