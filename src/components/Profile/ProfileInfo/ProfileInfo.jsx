import React, { useState, useEffect } from "react";
import avatarDefault from "../../../assets/image/avatarDefault.jpg";
import ProfileStatus from "./ProfileStatus";
import styles from "../../../styles/Profile.module.scss";
import {
  ReduxProfileInfoForm,
  ProfileUserInfo,
  ProfileAboutMe,
  ReduxProfileInfoFormAboutMe
} from "./ProfileUserInfo";
import { Button, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ProfileInfo = ({ profileUpdate, ...props }) => {
  const fileUpload = React.createRef();
  const photoSelected = e => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const [editModeName, setEditModeName] = useState(false);
  const [editModeAboutMe, setEditModeAboutMe] = useState(false);

  const onSubmit = formData => {
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

  const saveProfileBtn = React.createRef();

  return (
    <>
      <div className={styles.profileInfoCard}>
        <div className={styles.profileInfo}>
          <img
            src={
              props.profile.photos.large !== null
                ? props.profile.photos.large
                : avatarDefault
            }
            alt="AvaPhoto"
          />
          <textarea
            ref={fileUpload}
            type={"file"}
            onChange={photoSelected}
            style={{ display: "none" }}
          />
          {!props.isOwner ? (
            <div style={{ paddingTop: "3px" }}>
              <Button
                style={{ width: "250px" }}
                onClick={() => fileUpload.current.click()}
                variant="secondary"
              >
                Изменить фото
              </Button>
              {!props.isOwner && !editModeName && !editModeAboutMe ? (
                <Dropdown>
                  <Dropdown.Toggle style={{ marginTop: "3px", width: "250px" }}>
                    Редактировать профиль
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ width: "250px" }}>
                    <Dropdown.Item onClick={() => setEditModeName(true)}>
                      Имя и контакты
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setEditModeAboutMe(true)}>
                      Обо мне
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  style={{ marginTop: "3px", width: "250px" }}
                  variant="success"
                  onClick={() => saveProfileBtn.current.click()}
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
          <ProfileStatus {...props} />
          <div style={{ marginLeft: "10px" }}>
            {!editModeName ? (
              <ProfileUserInfo profile={props.profile} />
            ) : (
              <ReduxProfileInfoForm
                {...props}
                onSubmit={onSubmit}
                initialValues={props.profile}
                saveProfileBtn={saveProfileBtn}
              />
            )}
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "10px" }}>
        {!editModeAboutMe ? (
          <ProfileAboutMe profile={props.profile} />
        ) : (
          <ReduxProfileInfoFormAboutMe
            {...props}
            onSubmit={onSubmit}
            initialValues={props.profile}
            saveProfileBtn={saveProfileBtn}
          />
        )}
      </div>
    </>
  );
};

export default ProfileInfo;
