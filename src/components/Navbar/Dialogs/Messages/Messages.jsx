import React from "react";
import styles from "../../../../styles/Dialogs.module.scss";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import { Field, reduxForm } from "redux-form";
import { Button } from "react-bootstrap";
import { DeleteFilled } from "@ant-design/icons";

const Messages = ({ myId, ...props }) => {
  let messageItem = props.userMessages.items || [];

  // console.log(messageItem);
  return (
    <>
      {messageItem.map(item => (
        <div key={item.id} className={`${styles.message}`}>
          <Card
            className={`${
              item.senderId === myId
                ? styles.message_right
                : styles.message_left
            } ${
              item.isSelect
                ? `${styles.message_card_select} ${styles.message_card}`
                : styles.message_card
            }`}
            onClick={() => props.selectMessageThunk(item.id)}
          >
            {item.body.replace("<br />", "")}
            {item.isSelect && item.senderId === myId && (
              <span>
                <DeleteFilled className={styles.message_delete} onClick={()=>props.deleteMessageThunk(item.id)} />
              </span>
            )}

            <Moment
              format="DD-MM-YYYY HH:mm"
              className={
                item.senderId === myId
                  ? styles.message_data_right
                  : styles.message_data_left
              }
            >
              {item.addedAt}
            </Moment>
            {item.senderId === myId && !item.viewed && (
              <div className={styles.message_viewed} >не прочитано</div>
            )}
          </Card>
        </div>
      ))}
      <NewMessageFormRedux
        sendMessageThunk={props.sendMessageThunk}
        userId={props.userId}
      />
    </>
  );
};

const NewMessageForm = props => {
  const submit = async (message, dispatch) => {
    await props.sendMessageThunk(props.userId, message.newMessage);
    dispatch(props.reset("newMessage"));
  };

  return (
    <form onSubmit={props.handleSubmit(submit)}>
      <div className={`${styles.input}`}>
        <Field name="newMessage" component="textarea" />
        <Button variant="secondary" type="submit">
          Отправить
        </Button>
      </div>
    </form>
  );
};

const NewMessageFormRedux = reduxForm({ form: "newMessage" })(NewMessageForm);

export default Messages;
