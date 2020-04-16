import React from "react";
import styles from "../../../common/FormControl/FormControl.module.css";
import { reduxForm } from "redux-form";
import { fieldValue } from "../../../common/FormControl/FormControl";
import { required } from "../../../utilities/validation/validation";
import stylesProfile from "../../../styles/Profile.module.scss";

const ProfileInfoForm = ({ profile, error, ...props }) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <button
        type="submit"
        ref={props.saveProfileBtn}
        style={{ display: "none" }}
      >
        Сохранить
      </button>
      <div>{error && <div className={styles.errorText}>{error}</div>}</div>

      <div>
        <div className={stylesProfile.inputStyle_Name}>
          <b>Полное имя: </b>
          <div>
            {fieldValue(
              required,
              "fullName",
              "input",
              null,
              null,
              profile.fullName
            )}
          </div>
        </div>
        <div className={stylesProfile.inputStyle}>
          <b>Контакты: </b>
          <div>
            {Object.keys(profile.contacts).map(contact => {
              return (
                <span
                  key={contact}
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <b>{contact}: </b>
                  {fieldValue(
                    [],
                    "contacts." + contact,
                    "input",
                    contact,
                    null
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
};

export const ReduxProfileInfoForm = reduxForm({ form: "profileUserInfo" })(
  ProfileInfoForm
);

export const ProfileInfoFormAboutMe = ({ profile, error, ...props }) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <button
        type="submit"
        ref={props.saveProfileBtn}
        style={{ display: "none" }}
      >
        Сохранить
      </button>
      <span>{error && <span className={styles.errorText}>{error}</span>}</span>
      <div className={stylesProfile.aboutMe}>
        <div>
          <b>Обо мне: </b>
          {fieldValue(required, "aboutMe", null)}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <b>В поиске работы: </b>{" "}
          {fieldValue([], "lookingForAJob", "input", null, "checkbox")}
        </div>

        <div>
          <b>Мой скилл: </b>
          {fieldValue(required, "lookingForAJobDescription", null, null, null)}
        </div>
      </div>
    </form>
  );
};

export const ReduxProfileInfoFormAboutMe = reduxForm({
  form: "profileUserInfoAboutMe"
})(ProfileInfoFormAboutMe);

export const ProfileUserInfo = ({ profile }) => {
  return (
    <div>
      <b>Контакты: </b>
      {Object.keys(profile.contacts).map(contact => {
        return (
          <div key={contact} style={{ marginLeft: "15px" }}>
            {profile.contacts[contact] !== null &&
              profile.contacts[contact] !== "" && (
                <div>
                  <b>{contact}: </b>
                  {profile.contacts[contact]}
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};

export const ProfileAboutMe = ({ profile }) => {
  return (
    <div>
      <div>
        <b>Обо мне: </b>
        <div style={{marginLeft: '10px', width: '60%'}}>{profile.aboutMe}</div>
      </div>

      <div style={{display: 'flex', alignItem: 'center'}}>
        <b>В поиске работы: </b>
        <h5 style={{marginLeft: '10px'}}>{profile.lookingForAJob ? "Yes" : "No"}</h5>
      </div>

      <div>
        <b>Мои скиллы: </b>
        <div style={{marginLeft: '10px', width: '60%'}}>{profile.lookingForAJobDescription}</div>
      </div>
    </div>
  );
};
