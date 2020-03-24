import React from "react";
import classes from "../../../styles/Profile.module.scss";
import stylesError from "../../../common/FormControl/FormControl.module.css";
import { reduxForm } from "redux-form";
import {fieldValue } from "../../../common/FormControl/FormControl";
import { required } from "../../../utilities/validation/validation";

const ProfileInfoForm = ({ profile, error, ...props }) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {!props.isOwner &&  <button>Save</button>}

      <div>
        {error && <div className={stylesError.errorText}>{error}</div>}
      </div>

      <div>
        <b>Full Name: </b>
        {fieldValue(required, "fullName", "input",null,null,profile.fullName)}
      </div>
      <div>
        <b>About me: </b>
        {fieldValue(required, "aboutMe",null)}
      </div>
      <div>
        <b>Looking for a job: </b>
        {fieldValue(required, "lookingForAJob", "input",null,"checkbox")}
      </div>
      <div>
        <b>My professional skills: </b>
        {fieldValue(required, "lookingForAJobDescription",null,null,null)}
      </div>
      <div>
        <b>Contacts: </b>
        {Object.keys(profile.contacts).map(contact => {
          return (
            <div key={contact} className={classes.profileInfoContact}>
              <b>{contact}: </b>
              {fieldValue([], 'contacts.'+contact, "input", null, null)}
            </div>
          );
        })}
      </div>
    </form>
  );
};


export const ProfileUserInfo = ({profile, onEditMode, isOwner}) => {
  return (
    <div>
      {!isOwner && <button onClick={onEditMode}>Edit</button>}
      <div>
        <b>Full Name: </b>{profile.fullName}
      </div>
      <div>
        <b>About me: </b>{profile.aboutMe}
      </div>
      <div>
        <b>Looking for a job: </b>{profile.lookingForAJob ? "Yes" : "No"}
      </div>
      <div>
        <b>My professional skills: </b>{profile.lookingForAJobDescription}
      </div>
      <div>
        <b>Contacts: </b>
        {Object.keys(profile.contacts).map(contact => {
          return (
            <div key={contact} className={classes.profileInfoContact}>
              <b>{contact}: </b>
              {profile.contacts[contact]}
            </div>
          );
        })}
      </div>
    </div>
  )
}

const ReduxProfileInfoForm = reduxForm({ form: "profileUserInfo" })(ProfileInfoForm);

export default ReduxProfileInfoForm;
