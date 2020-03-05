import React, { useState, useEffect } from "react";
import classes from "./ProfileInfo.module.css";

const ProfileStatus = props => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const userId = props.match.params.userId;

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activatedEditMode = () => {
    if (userId === undefined) {
      setEditMode(true);
    }
  };
  const deactivatedEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = ev => {
    setStatus(ev.currentTarget.value);
  };

  return (
    <div className={classes.item}>
      {!editMode && (
        <div>
          <b>Status: </b>
          <span onClick={activatedEditMode}>
            {props.status || "<<<Not indicated>>>"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <b>Status: </b>
          <input
            onChange={onStatusChange}
            onBlur={() => {
              setTimeout(() => {
                setEditMode(false);
              }, 500);
            }}
            autoFocus={true}
            value={status}
          />
          <button onClick={deactivatedEditMode}>OK</button>
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
