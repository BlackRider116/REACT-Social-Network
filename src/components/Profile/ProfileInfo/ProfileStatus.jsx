import React, { useState, useEffect } from "react";
import classes from "./ProfileInfo.module.css";

const ProfileStatus = props => {
  const [editMode, setEdiMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const userId = props.match.params.userId;

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activatedEditMode = () => {
    if (userId === undefined) {
      setEdiMode(true);
    }
  };
  const deactivatedEditMode = () => {
    setEdiMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = ev => {
    setStatus(ev.currentTarget.value);
  };

  return (
    <div className={classes.item}>
      {!editMode && (
        <div>
          <span onDoubleClick={activatedEditMode}>
            {props.status || "<<<The user did not set the status>>>"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            onBlur={() => {
              setTimeout(() => {
                setEdiMode(false);
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
