import { addMessage, inputMessage } from "../../../redux/reduceDialogs";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";

const mapStateToProps = state => {
  return {
    inputText: state.messagesPage.inputMessage,
    messagesItems: state.messagesPage.messages,
    dialogItem: state.messagesPage.usersDialog,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewMessage: () => {
      dispatch(addMessage());
    },
    messageChange: value => {
      dispatch(inputMessage(value));
    }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
