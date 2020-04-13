import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import styles from "../../../styles/Dialogs.module.scss";
import { getAllDialogsThunk, getUserMessagesThunk, UserMessagesType, sendMessageThunk, deleteMessageThunk, selectMessageThunk } from "../../../redux/reduceDialogs";
import { UserInfoType } from '../../../redux/reduceDialogs'
import { GlobalStateType } from "../../../redux/reduxStore";
import UsersDialog from "./UsersDialog/UsersDialog";
import Messages from "./Messages/Messages";


type PropsType = MapStateToPropsType & MapDispatchToPropsType
class DialogsContainer extends React.Component<PropsType> {
  //@ts-ignore
  userId = this.props.match.params.userId
  componentDidMount() {
    this.props.getAllDialogsThunk();
    if (this.userId) {
      this.props.getUserMessagesThunk(this.userId)
    }
  }

  componentDidUpdate() {
    // console.log(this.props.userMessages)
  }

  render() {
    return (
      <div className={styles.dialogs}>
        <div>
          {this.props.usersInfo.map((user: UserInfoType) => (
            <UsersDialog key={user.id} userInfo={user} userMessages={this.props.getUserMessagesThunk} />
          ))}
        </div>

        <div>
          <Messages
            userMessages={this.props.userMessages}
            myId={this.props.myId}
            userId={this.userId}
            sendMessageThunk={this.props.sendMessageThunk}
            selectMessageThunk={this.props.selectMessageThunk}
            deleteMessageThunk={this.props.deleteMessageThunk} />
        </div>

      </div>
    );
  }
}


type MapStateToPropsType = {
  usersInfo: Array<UserInfoType>
  userMessages: UserMessagesType
  myId: number | null
}
const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => {
  return {
    usersInfo: state.messagesPage.usersInfo,
    userMessages: state.messagesPage.userMessages,
    myId: state.auth.userId
  };
};

type MapDispatchToPropsType = {
  getAllDialogsThunk: () => void
  getUserMessagesThunk: (userId: number) => void
  sendMessageThunk: (userId: number, message: string) => void
  deleteMessageThunk: (messageID: string) => void
  selectMessageThunk: (messageId: string) => void
}
export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalStateType>(mapStateToProps,
    {
      getAllDialogsThunk,
      getUserMessagesThunk,
      sendMessageThunk,
      deleteMessageThunk,
      selectMessageThunk
    }),
  withRouter,
  withAuthRedirect
)(DialogsContainer);
