import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../../../styles/Profile.module.scss";


type PropsType = {
  status: string
  isOwner: number | undefined
  updateUserStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = props => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activatedEditMode = () => {
    if (!props.isOwner) {
      setEditMode(true);
    }
  };
  const deactivatedEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.currentTarget.value);
  };

  return (
    <div className={styles.profileInfoItem}>
      {!editMode ? (
        <div className={styles.status__text}
          onClick={activatedEditMode}
        >
          {props.status}
        </div>
      ) : (
          <div style={{ cursor: "pointer" }}>
            <input  
              placeholder="Введите Ваш статус"
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
  )
};

export default ProfileStatus;
