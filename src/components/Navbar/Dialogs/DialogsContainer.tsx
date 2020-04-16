import React from "react";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import styles from "../../../styles/Dialogs.module.scss";
import { getAllDialogsThunk, getUserMessagesThunk, UserMessagesType, sendMessageThunk, deleteMessageThunk, selectMessageThunk, MessagesType } from "../../../redux/reducers/reduceDialogs";
import { UserInfoType } from '../../../redux/reducers/reduceDialogs'
import { GlobalStateType } from "../../../redux/reduxStore";
import UsersDialog from "./UsersDialog/UsersDialog";
import Messages from "./Messages/Messages";
import Preloader from "../../../common/Preloader/Preloader";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";


type PropsType = MapStateToPropsType & MapDispatchToPropsType
class DialogsContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getAllDialogsThunk();
    if (this.props.openUserDialogsId !== -1) {
      this.props.getUserMessagesThunk(this.props.openUserDialogsId)
    }
  }

  componentWillUnmount() {
    this.props.getUserMessagesThunk(-1)
  }

  render() {
    if (this.props.usersInfo === null) return <Preloader />
    if (this.props.usersInfo.length === 0) return <Card style={{ textAlign: 'center', fontSize: '20px', height: '100px' }}>
      У Вас нет начатых диалогов. Чтобы начать диалог перейдите на страницу<NavLink to="/users"> пользователей</NavLink>
    </Card>
    return (
      <div className={styles.dialogsPage}>
        <div>
          <UsersDialog
            userInfo={this.props.usersInfo}
            userMessages={this.props.getUserMessagesThunk}
            openUserDialogsId={this.props.openUserDialogsId} />
        </div>

        <div>
          <Messages
            userMessages={this.props.userMessages}
            openUserDialogsId={this.props.openUserDialogsId}
            myId={this.props.myId}
            sendMessageThunk={this.props.sendMessageThunk}
            selectMessageThunk={this.props.selectMessageThunk}
            deleteMessageThunk={this.props.deleteMessageThunk} />
        </div>

      </div>
    );
  }
}


type MapStateToPropsType = {
  usersInfo: Array<UserInfoType> | null
  userMessages: UserMessagesType
  openUserDialogsId: number
  myId: number | null
}
const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => {
  return {
    usersInfo: state.messagesPage.usersInfo,
    userMessages: state.messagesPage.userMessages,
    openUserDialogsId: state.messagesPage.openUserDialogsId,
    myId: state.auth.userId
  };
};

type MapDispatchToPropsType = {
  getAllDialogsThunk: () => void
  getUserMessagesThunk: (userId: number) => void
  sendMessageThunk: (userId: number, message: string) => void
  deleteMessageThunk: (message: MessagesType) => void
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
  withAuthRedirect
)(DialogsContainer);
