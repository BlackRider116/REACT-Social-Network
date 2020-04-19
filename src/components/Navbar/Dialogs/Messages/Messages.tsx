import React, { Dispatch, ComponentType } from "react";
import styles from "../../../../styles/Dialogs.module.scss";
import Moment from "react-moment";
import { Field, reduxForm, InjectedFormProps, reset } from "redux-form";
import { Button, Card } from "react-bootstrap";
import { DeleteFilled } from "@ant-design/icons";
import { Scrollbars } from "react-custom-scrollbars";
import { UserMessagesType, MessagesType } from "../../../../redux/reducers/reduceDialogs";

type PropsType = {
  myId: number | null
  userMessages: UserMessagesType
  openUserDialogsId: number
  sendMessageThunk: (userId: number, message: string) => void
  deleteMessageThunk: (message: MessagesType) => void
  selectMessageThunk: (messageId: string) => void
}

const Messages: React.FC<PropsType> = ({ myId, ...props }) => {
  const messageItem = props.userMessages.items || [];

  return (
    <Card className={styles.cardDialogs}>
      <div style={{ height: "86vh" }}>
        <Scrollbars style={{ width: "100%", height: "100%" }}>
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
                <div>
                  {item.body.replace("<br />", "")}
                  {item.isSelect && item.senderId === myId && (
                    <span>
                      <DeleteFilled
                        className={styles.message_delete}
                        onClick={() => props.deleteMessageThunk(item)}
                      />
                    </span>
                  )}
                </div>

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
                  <div className={styles.message_viewed}>не прочитано</div>
                )}
              </Card>
            </div>
          ))}
        </Scrollbars>
      </div>
      {props.openUserDialogsId !== -1 && (
        <NewMessageFormRedux
          openUserDialogsId={props.openUserDialogsId}
          sendMessageThunk={props.sendMessageThunk}
        />
      )}
    </Card>
  );
};


type BodyValuesType = { newMessage: string }
type FormType = {
  openUserDialogsId: number
  sendMessageThunk: (userId: number, message: string) => void
}
const NewMessageForm: React.FC<InjectedFormProps<BodyValuesType, FormType> & FormType> = props => {
  const submit = (message: BodyValuesType, dispatch: Dispatch<{}>) => {
    props.sendMessageThunk(props.openUserDialogsId, message.newMessage);
    dispatch(reset("newMessage"));
  };
  return (
    <form onSubmit={props.handleSubmit(submit)}>
      <div className={styles.input}>
        <Field
          name="newMessage"
          component="textarea"
          placeholder=" Введите сообщение"
        />
        <Button variant="secondary" type="submit">
          Ok
        </Button>
      </div>
    </form>
  );
};

const NewMessageFormRedux = reduxForm<BodyValuesType, FormType>({ form: "newMessage" })(NewMessageForm);

export default Messages;
