import classes from "./ProfileInfo.module.css"
import React from 'react'
import Preloader from "../../../common/Preloader/Preloader";
import avatarDefault from "../../../assets/image/avatarDefault.jpg"

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div >
      <img alt='Background img' src="https://st.depositphotos.com/1038117/2001/i/450/depositphotos_20018963-stock-photo-anse-lazio-beach-at-praslin.jpg"></img>
      <div className={classes.item}>
        <img src={props.profile.photos.large !== null ? props.profile.photos.large : avatarDefault} alt='AvaPhoto'/>
        avatar + description
        </div>
    </div>
  );
};
 export default ProfileInfo;