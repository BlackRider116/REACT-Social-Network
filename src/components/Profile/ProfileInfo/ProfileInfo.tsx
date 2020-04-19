import React, { useState, useEffect, ChangeEvent } from "react";
import avatarDefault from "../../../assets/image/avatarDefault.jpg";
import ProfileStatus from "./ProfileStatus";
import styles from "../../../styles/Profile.module.scss";
import {
  ReduxProfileInfoForm,
  ProfileUserInfo,
  ProfileAboutMe,
  ReduxProfileInfoFormAboutMe
} from "./ProfileUserInfo";
import { Button, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ProfileType } from "../../../redux/reducers/reduceProfile";

type PropsType = {
  isOwner: number | undefined
  profileUpdate: boolean | null
  profile: ProfileType
  isFollow: boolean
  status: string

  onFollowThunk: (userId: number, isFollow: boolean) => void
  savePhoto: (file: File) => void
  saveProfile: (formData: ProfileType) => void
  updateUserStatus: (status: string) => void
  startDialogThunk: (userId: number) => void
}


const ProfileInfo: React.FC<PropsType> = ({ profileUpdate, ...props }) => {

  const photoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files.length) {
      props.savePhoto(event.target.files[0]);
    }
  };

  const [editModeName, setEditModeName] = useState(false);
  const [editModeAboutMe, setEditModeAboutMe] = useState(false);

  const onSubmit = (formData: ProfileType) => {
    if (formData !== props.profile) {
      props.saveProfile(formData);
    } else if (profileUpdate !== false) {
      setEditModeName(false);
      setEditModeAboutMe(false);
    }
  };

  useEffect(() => {
    if (profileUpdate === true) {
      setEditModeName(false);
      setEditModeAboutMe(false);
    }
  }, [profileUpdate]);

  const fileUpload: React.RefObject<HTMLInputElement> = React.createRef();
  const saveProfileBtn: React.RefObject<HTMLButtonElement> = React.createRef();

  return (
    <>
      <div className={styles.profileInfoCard}>
        <div className={styles.profileInfo}>
          <img
            src={props.profile !== null && props.profile.photos.large !== null
              ? props.profile.photos.large
              : avatarDefault
            }
            alt="AvaPhoto"
          />
          <input
            ref={fileUpload}
            type={"file"}
            onChange={photoSelected}
            style={{ display: "none" }}
          />
          {!props.isOwner ? (
            <div style={{ paddingTop: "3px" }}>
              <Button
                style={{ width: "250px" }}
                onClick={() => { if (fileUpload.current) fileUpload.current.click() }}
                variant="secondary"
              >
                Изменить фото
              </Button>
              {!props.isOwner && !editModeName && !editModeAboutMe ? (
                <DropdownButton key={'DropdownButton'} as={ButtonGroup} id="dropdown-variant-primary" title="Редактировать профиль" style={{ marginTop: "3px", width: "100%" }}>
                  <Dropdown.Item style={{ width: "250px" }} onClick={() => setEditModeName(true)}>Имя и контакты</Dropdown.Item>
                  <Dropdown.Item style={{ width: "250px" }} onClick={() => setEditModeAboutMe(true)}>Обо мне</Dropdown.Item>
                </DropdownButton>
              ) : (
                  <Button
                    style={{ marginTop: "3px", width: "250px" }}
                    variant="success"
                    onClick={() => { if (saveProfileBtn.current) saveProfileBtn.current.click() }}
                  >
                    Сохранить
                </Button>
                )}
            </div>
          ) : (
              <div style={{ marginTop: "5px" }}>
                <div>
                  {!props.isFollow ? (
                    <Button
                      style={{ width: "250px" }}
                      variant="success"
                      onClick={() =>
                        props.onFollowThunk(props.profile.userId, props.isFollow)
                      }
                    >
                      Подписаться
                  </Button>
                  ) : (
                      <Button
                        style={{ width: "250px" }}
                        variant="danger"
                        onClick={() =>
                          props.onFollowThunk(props.profile.userId, props.isFollow)
                        }
                      >
                        Отписаться
                  </Button>
                    )}
                </div>
                <div style={{ marginTop: "3px" }}>
                  <NavLink to={`/dialogs/${props.profile.userId}`}>
                    <Button
                      style={{ width: "250px" }}
                      onClick={() => props.startDialogThunk(props.profile.userId)}
                    >
                      Написать сообщение
                  </Button>
                  </NavLink>
                </div>
              </div>
            )}
        </div>
        <div style={{ margin: "10px" }}>
          <h3>{props.profile.fullName}</h3>
          <ProfileStatus
            isOwner={props.isOwner}
            status={props.status}
            updateUserStatus={props.updateUserStatus}
          />
          <div style={{ marginLeft: "10px" }}>
            {!editModeName ? (
              <ProfileUserInfo contacts={props.profile.contacts} />
            ) : (
                <ReduxProfileInfoForm
                  onSubmit={onSubmit}
                  profile={props.profile}
                  initialValues={props.profile}
                  saveProfileBtn={saveProfileBtn}
                />
              )}
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "10px" }}>
        {!editModeAboutMe ? (
          <ProfileAboutMe
            aboutMe={props.profile.aboutMe}
            lookingForAJob={props.profile.lookingForAJob}
            lookingForAJobDescription={props.profile.lookingForAJobDescription} />
        ) : (
            <ReduxProfileInfoFormAboutMe
              onSubmit={onSubmit}
              profile={props.profile}
              initialValues={props.profile}
              saveProfileBtn={saveProfileBtn}
            />
          )}
      </div>
    </>
  );
};

export default ProfileInfo;
