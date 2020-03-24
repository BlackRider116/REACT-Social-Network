import React from "react";
import classes from "../../../styles/Dialogs.module.css";
import UsersDialog from "./UsersDialog/UsersDialog";
import MessagesItems from "./Messages/Messages";
import { Field, reduxForm } from "redux-form";
import {reset} from 'redux-form';

const Dialogs = props => {
  const messagesItems = props.messagesItems.map(message => (
    <MessagesItems message={message.message} key={message.id} />
  ));

  const dialogItem = props.dialogItem.map(user => (
    <UsersDialog state={user} key={user.id} />
  ));

  const onSubmit = (messageText, dispatch) => {
    props.addNewMessage(messageText);
    dispatch(reset("newMessage"))
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialog}>{dialogItem}</div>
      <div>
        <div className={classes.messages}>{messagesItems}</div>
        <NewMessageFormRedux onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const NewMessageForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={`${classes.input}`}>
        <Field name="newMessage" component="textarea" />
        <button>Send</button>
      </div>
    </form>
  );
};

const NewMessageFormRedux = reduxForm({ form: "newMessage" })(NewMessageForm);

export default Dialogs;
