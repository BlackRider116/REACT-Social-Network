import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import { addNewMessage } from "../../../redux/reduceDialogs";

const mapStateToProps = state => {
  return {
    messagesItems: state.messagesPage.messages,
    dialogItem: state.messagesPage.usersDialog,
  };
};

export default compose(
  connect(mapStateToProps, {addNewMessage}),
  withAuthRedirect
)(Dialogs);
