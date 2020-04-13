import { GlobalStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';
import { dialogsAPI } from '../api/api';

const GET_ALL_DIALOGS = "/dialogs/GET_ALL_DIALOGS";
const GET_USER_MESSAGES = "/dialogs/GET_USER_MESSAGES";
const SEND_MESSAGE = "/dialogs/SEND_MESSAGE";
const DELETE_MESSAGE = "/dialogs/DELETE_MESSAGE";
const SELECT_MESSAGE = '/dialogs/SELECT_MESSAGE'

export type UserInfoType = {
  id: number
  userName: string
  hasNewMessages: boolean
  lastDialogActivityDate: string
  lastUserActivityDate: string
  newMessagesCount: number
  photos: { small: string, large: string }
}

type MessagesType = {
  id: string
  body: string
  translatedBody: any | null
  addedAt: string
  senderId: number
  senderName: string
  recipientId: number
  viewed: boolean
  recipientName?: string
  deletedBySender?: boolean
  deletedByRecipient?: boolean
  isSpam?: boolean
  distributionId?: null | any
  isSelect?: boolean
}

export type UserMessagesType = {
  items: Array<MessagesType>
  totalCount?: number
  error?: any | null
}

const initialState = {
  usersInfo: [] as Array<UserInfoType>,
  userMessages: {} as UserMessagesType,
}
type InitialStateType = typeof initialState

const reduceDialogs = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case GET_ALL_DIALOGS:
    case GET_USER_MESSAGES:
      return {
        ...state,
        ...action.payload
      }
    case SEND_MESSAGE:
      return {
        ...state,
        userMessages: { items: [...state.userMessages.items, action.message] }
      }
    case SELECT_MESSAGE:
      return {
        ...state,
        userMessages: { items: action.selectMessage }
      }
    case DELETE_MESSAGE:
      return {
        ...state,
        userMessages: { items: state.userMessages.items.filter(item => item.id !== action.messageId) }
      }
    default:
      return state;
  }
};
type ActionsTypes = GetAllDialogsType | GetUserMessagesType | SendMessageType | DeleteMessageType | SelectMessageType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

type GetAllDialogsType = { type: typeof GET_ALL_DIALOGS, payload: { usersInfo: Array<UserInfoType> } }
const getAllDialogsAC = (usersInfo: Array<UserInfoType>): GetAllDialogsType => ({ type: GET_ALL_DIALOGS, payload: { usersInfo } })

export const getAllDialogsThunk = (): ThunkType => async dispatch => {
  const data = await dialogsAPI.getAllDialogs()
  dispatch(getAllDialogsAC(data))
  localStorage.removeItem('SelectMessage');
}

type GetUserMessagesType = { type: typeof GET_USER_MESSAGES, payload: { userMessages: UserMessagesType } }
const getUserMessagesAC = (userMessages: UserMessagesType): GetUserMessagesType => ({ type: GET_USER_MESSAGES, payload: { userMessages } })

export const getUserMessagesThunk = (userId: number): ThunkType => async dispatch => {
  const data = await dialogsAPI.getListMessages(userId)
  dispatch(getUserMessagesAC(data))
}

type SendMessageType = { type: typeof SEND_MESSAGE, message: MessagesType }
const sendMessageAC = (message: MessagesType): SendMessageType => ({ type: SEND_MESSAGE, message })

export const sendMessageThunk = (userId: number, message: string): ThunkType => async dispatch => {
  const response = await dialogsAPI.sendMessage(userId, message)
  dispatch(sendMessageAC(response.data.message))
}

type DeleteMessageType = { type: typeof DELETE_MESSAGE, messageId: string }
const deleteMessageAC = (messageId: string): DeleteMessageType => ({ type: DELETE_MESSAGE, messageId })

export const deleteMessageThunk = (messageId: string): ThunkType => async dispatch => {
  await dialogsAPI.deleteMessage(messageId)
  dispatch(deleteMessageAC(messageId))
}

type SelectMessageType = { type: typeof SELECT_MESSAGE, selectMessage: Array<MessagesType> }
const selectMessageAC = (selectMessage: Array<MessagesType>): SelectMessageType => ({ type: SELECT_MESSAGE, selectMessage })

export const selectMessageThunk = (messageId: string): ThunkType => async (dispatch, getState) => {
  const stateMessage = getState().messagesPage.userMessages.items
  const selectMessage = JSON.parse(localStorage.getItem("SelectMessage") || "[]");
  let arr = selectMessage

  const newStateMessage = stateMessage.map(item => {
    if (item.id === messageId) {

      const isSelect = item.isSelect ? false : true;
      isSelect === true ? arr.push(messageId) : arr = arr.filter((mes: string) => mes !== item.id)
      return { ...item, isSelect };
    }
    return item
  });

  dispatch(selectMessageAC(newStateMessage))
  localStorage.setItem("SelectMessage", JSON.stringify(arr));
}

export default reduceDialogs;
