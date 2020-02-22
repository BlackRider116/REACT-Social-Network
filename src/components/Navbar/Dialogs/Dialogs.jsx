import React from "react";
import classes from "./Dialogs.module.css";
import UsersDialog from "./UsersDialog/UsersDialog";
import MessagesItems from "./Messages/Messages";

const Dialogs = props => {
  const messagesItems = props.messagesItems.map(message => (
    <MessagesItems message={message.message} key={message.id} />
  ));

  const dialogItem = props.dialogItem.map(user => (
    <UsersDialog state={user} key={user.id} />
  ));

  const onAddNewMessage = () => {
    props.addNewMessage();
  };

  const onMessageChange = event => {
    const message = event.target.value;
    props.messageChange(message);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialog}>{dialogItem}</div>

      <div className={classes.messages}>
        {messagesItems}
        <div className={`${classes.input}`}>
          <textarea onChange={onMessageChange} value={props.inputText} />
          <button onClick={onAddNewMessage}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
