import React, { useState, useEffect } from "react";
import classes from "../../../styles/Profile.module.scss";

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
    <div className={classes.profileInfoItem}>
      {!editMode && (
        <div onClick={activatedEditMode} style={{cursor: 'pointer'}}>
          <b>Статус: </b>
          <span >
            {props.status }
          </span>
        </div>
      )}
      {editMode && (
        <div style={{cursor: 'pointer'}}>
          <b>Статус: </b>
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
