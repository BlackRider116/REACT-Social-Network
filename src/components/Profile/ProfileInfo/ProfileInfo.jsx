import React, { useState, useEffect } from "react";
import avatarDefault from "../../../assets/image/avatarDefault.jpg";
import ProfileStatus from "./ProfileStatus";
import classes from "../../../styles/Profile.module.scss";
import ProfileInfoForm, { ProfileUserInfo } from "./ProfileUserInfo";
import { Button } from "react-bootstrap";

const ProfileInfo = ({ profileUpdate, ...props }) => {
  
  const fileUpload = React.createRef();
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
      <div className={classes.profileInfoItem}>
        <img
          className={classes.profileInfoAvatar}
          src={
            props.profile.photos.large !== null
              ? props.profile.photos.large
              : avatarDefault
          }
          alt="AvaPhoto"
        />
        <input ref={fileUpload} type={"file"} onChange={photoSelected} style={{display:'none'}}/>
        {!props.isOwner && <div style={{paddingTop: '3px'}}><Button style={{width: '250px'}} onClick={() => fileUpload.current.click()} variant='secondary'>Загрузить фото</Button></div> }
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
