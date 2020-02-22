import { addMessage, inputMessage } from "../../../redux/reduceDialogs";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

// const DialogsContainer = props => {
//   // debugger;
//   const state = props.state.messagesPage

//   const addNewMessage = () => {
//     props.dispatch(addMessage());
//   };

//   const messageChange = value => {
//     props.dispatch(inputMessage(value));
//   };

//   return (
//     <Dialogs
//       addNewMessage={addNewMessage}
//       messageChange={messageChange}
//       inputText={state.inputMessage}
//       messagesItems={state.messages}
//       dialogItem={state.usersDialog}
//     />
//   );
// };

const mapStateToProps = state => {
  return {
    inputText: state.messagesPage.inputMessage,
    messagesItems: state.messagesPage.messages,
    dialogItem: state.messagesPage.usersDialog
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
