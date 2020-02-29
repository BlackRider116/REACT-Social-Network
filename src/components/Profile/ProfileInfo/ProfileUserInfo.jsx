import React, { useState } from "react";
import classes from "./ProfileInfo.module.css";
import { reduxForm } from "redux-form";
import {fieldValue } from "../../../common/FormControl/FormControl";
import {requiredProfile } from "../../../utilities/validation/validation";

const ProfileUserInfoForm = ({ profile, ...props }) => {

  const [editMode, setEditMode] = useState(false);

  return (
    <form onSubmit={props.handleSubmit}>
      {!props.isOwner && (!editMode ? <button onClick={()=>{setEditMode(true)}}>Edit</button> 
                                    : <button onClick={()=>{setEditMode(false)}}>Save</button>)}
      <div>
        <b>Full Name: </b>
        {!editMode ? profile.fullName : fieldValue(requiredProfile, "fullName", "input",null,null,profile.fullName)}
      </div>
      <div>
        <b>About me: </b>
        {!editMode ? profile.aboutMe : fieldValue(requiredProfile, "aboutMe",null)}
      </div>
      <div>
        <b>Looking for a job: </b>
        {!editMode ? (profile.lookingForAJob ? "Yes" : "No") : fieldValue(requiredProfile, "lookingForAJob", "input",null,"checkbox")}
      </div>
      <div>
        <b>Looking for a job description: </b>
        {!editMode ? profile.lookingForAJobDescription : fieldValue(requiredProfile, "lookingForAJobDescription",null,null,null)}
      </div>
      <div>
        <b>Contacts: </b>
        {Object.keys(profile.contacts).map(contact => {
          return (
            <div key={contact} className={classes.contact}>
              <b>{contact}: </b>
              {!editMode ? profile.contacts[contact] : fieldValue(requiredProfile, 'contacts.'+contact, "input", null, null)}
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ReduxProfileUserInfo = reduxForm({ form: "profileUserInfo" })(ProfileUserInfoForm);

export default ReduxProfileUserInfo;
