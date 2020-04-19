import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import  MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../../common/Preloader/Preloader";
import { Card } from "react-bootstrap";
import styles from '../../styles/Profile.module.scss'
import { ProfileType } from "../../redux/reducers/reduceProfile";

type PropsType = {
  profile: ProfileType | null
  status: string
  profileUpdate: boolean | null
  isFollow: boolean
  isOwner: number 

  updateUserStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (formData: any) => void
  startDialogThunk: (userId: number) => void
  onFollowThunk: (userId: number, isFollow: boolean) => void
}

const Profile: React.FC<PropsType> = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <Card className={styles.global} >
      <ProfileInfo
        profile={props.profile}
        profileUpdate={props.profileUpdate}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        startDialogThunk={props.startDialogThunk}
        isFollow={props.isFollow}
        onFollowThunk={props.onFollowThunk}
      />
      <MyPostsContainer />
    </Card>
  );
};

export default Profile;
