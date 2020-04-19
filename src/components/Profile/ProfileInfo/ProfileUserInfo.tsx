import React from "react";
import styles from "../../../common/FormControl/FormControl.module.css";
import { reduxForm, InjectedFormProps } from "redux-form";
import { fieldValue } from "../../../common/FormControl/FormControl";
import { required } from "../../../utilities/validation/validation";
import stylesProfile from "../../../styles/Profile.module.scss";
import { ProfileType } from "../../../redux/reducers/reduceProfile";

type OwnPropsFormType = {
  saveProfileBtn: React.RefObject<HTMLButtonElement>
  initialValues: ProfileType
  profile: ProfileType
}

const ProfileInfoForm: React.FC<InjectedFormProps<ProfileType, OwnPropsFormType> & OwnPropsFormType> = ({ profile, error, ...props }) => {
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
              undefined,
              undefined,
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
                    undefined
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

export const ReduxProfileInfoForm = reduxForm<ProfileType, OwnPropsFormType>({ form: "profileUserInfo" })(ProfileInfoForm)

export const ProfileInfoFormAboutMe: React.FC<InjectedFormProps<ProfileType, OwnPropsFormType> & OwnPropsFormType> = ({ profile, error, ...props }) => {
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
          {fieldValue(required, "aboutMe", undefined, undefined, undefined)}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <b>В поиске работы: </b>{" "}
          {fieldValue([], "lookingForAJob", "input", undefined, "checkbox")}
        </div>

        <div>
          <b>Мой скилл: </b>
          {fieldValue(required, "lookingForAJobDescription", undefined, undefined, undefined)}
        </div>
      </div>
    </form>
  );
};

export const ReduxProfileInfoFormAboutMe = reduxForm<ProfileType, OwnPropsFormType>({ form: "profileUserInfoAboutMe" })(ProfileInfoFormAboutMe);

type ProfileUserInfoType = {
  contacts: KeysType
}

type KeysType = {
    skype: string | null
    vk: string | null
    facebook: string | null
    icq: string | null
    email: string | null
    googlePlus: string | null
    twitter: string | null
    instagram: string | null
    whatsApp: string | null
}

export const ProfileUserInfo: React.FC<ProfileUserInfoType> = ({ contacts }) => {
  return (
    <div>
      <b>Контакты: </b>
      {Object.keys(contacts).map((contact) => {
        return (
          <div key={contact} style={{ marginLeft: "15px" }}>
            {contacts[contact as keyof KeysType] !== null &&
              contacts[contact as keyof KeysType] !== "" && (
                <div>
                  <b>{contact}: </b>
                  {contacts[contact as keyof KeysType]}
                </div>
              )}
          </div>
        );
      })} 
    </div>
  );
};

type ProfileAboutMeType = {
  aboutMe: string | null
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
}

export const ProfileAboutMe: React.FC<ProfileAboutMeType> = (props) => {
  return (
    <div>
      <div>
        <b>Обо мне: </b>
        <div style={{ marginLeft: "10px", width: "60%" }}>
          {props.aboutMe}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <b>В поиске работы: </b>
        <h5 style={{ marginLeft: "10px" }}>
          {props.lookingForAJob ? (
            <span style={{ color: "green" }}>Yes</span>
          ) : (
              <span style={{ color: "red" }}>No</span>
            )}
        </h5>
      </div>

      <div>
        <b>Мои скиллы: </b>
        <div style={{ marginLeft: "10px", width: "60%" }}>
          {props.lookingForAJobDescription}
        </div>
      </div>
    </div>
  );
};
