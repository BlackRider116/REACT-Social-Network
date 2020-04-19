import { GlobalStateType, InferActionsTypes } from '../reduxStore';
import { ThunkAction } from 'redux-thunk';
import { dialogsAPI } from '../../api/api';

export type UserInfoType = {
  id: number
  userName: string
  hasNewMessages: boolean
  lastDialogActivityDate: string
  lastUserActivityDate: string
  newMessagesCount: number
  photos: { small: string, large: string }
}

export type MessagesType = {
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
  totalCount?: number | undefined
  error?: any | null
}

const initialState = {
  usersInfo: null as Array<UserInfoType> | null,
  userMessages: {} as UserMessagesType,
  openUserDialogsId: Number(window.location.hash.replace("#/dialogs/", "")) || -1 as number,
  newMessagesCount: 0 as number
}
type InitialStateType = typeof initialState

const reduceDialogs = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case '/dialogs/GET_ALL_DIALOGS':
    case '/dialogs/GET_USER_MESSAGES':
    case '/dialogs/NEW_MESSAGES_COUNT':
      return {
        ...state,
        ...action.payload
      }
    case '/dialogs/SEND_MESSAGE':
      return {
        ...state,
        userMessages: { items: [...state.userMessages.items, action.message] }
      }
    case '/dialogs/SELECT_MESSAGE':
      return {
        ...state,
        userMessages: { items: action.selectMessage }
      }
    case '/dialogs/DELETE_MESSAGE':
      return {
        ...state,
        userMessages: { items: state.userMessages.items.filter(item => item.id !== action.messageId) }
      }
    case '/dialogs/DELETE_GET_USER_MESSAGES':
      return {
        ...state,
        userMessages: { items: [] },
        openUserDialogsId: action.openUserDialogsId
      }
    default:
      return state;
  }
};
type ActionsTypes = InferActionsTypes<typeof actionsDialogs>
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

const actionsDialogs = {
  getAllDialogsAC: (usersInfo: Array<UserInfoType>) =>  ({ type: '/dialogs/GET_ALL_DIALOGS', payload: { usersInfo } } as const),
  getUserMessagesAC: (userMessages: UserMessagesType, openUserDialogsId: number) => ({ type: '/dialogs/GET_USER_MESSAGES', payload: { userMessages, openUserDialogsId } } as const),
  deleteGetUserMessagesAC: (openUserDialogsId: number) => ({ type: '/dialogs/DELETE_GET_USER_MESSAGES', openUserDialogsId } as const),
  sendMessageAC: (message: MessagesType) => ({ type: '/dialogs/SEND_MESSAGE', message } as const),
  deleteMessageAC: (messageId: string) => ({ type: '/dialogs/DELETE_MESSAGE', messageId } as const),
  selectMessageAC: (selectMessage: Array<MessagesType>) => ({ type: '/dialogs/SELECT_MESSAGE', selectMessage } as const),
  newMessagesCount: (newMessagesCount: number) => ({ type: '/dialogs/NEW_MESSAGES_COUNT', payload: { newMessagesCount } } as const)
}

export const getAllDialogsThunk = (): ThunkType => async dispatch => {
  const data = await dialogsAPI.getAllDialogs()
  dispatch(actionsDialogs.getAllDialogsAC(data))
  localStorage.removeItem('SelectMessage');
}

export const getUserMessagesThunk = (userId: number): ThunkType => async dispatch => {
  const data = await dialogsAPI.getListMessages(userId)
  userId !== -1 ? dispatch(actionsDialogs.getUserMessagesAC(data, userId)) : dispatch(actionsDialogs.deleteGetUserMessagesAC(userId))
}

export const sendMessageThunk = (userId: number, message: string): ThunkType => async dispatch => {
  if (message) {
    const response = await dialogsAPI.sendMessage(userId, message)
    dispatch(actionsDialogs.sendMessageAC(response.data.message))
  }
}

export const deleteMessageThunk = (message: MessagesType): ThunkType => async (dispatch, getState) => {
  await dialogsAPI.deleteMessage(message.id)
  const stateMessageLength = getState().messagesPage.userMessages.items.length
  const userId = getState().messagesPage.openUserDialogsId
  stateMessageLength > 10 ? dispatch(actionsDialogs.deleteMessageAC(message.id)) : dispatch(getUserMessagesThunk(userId))
}

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

  dispatch(actionsDialogs.selectMessageAC(newStateMessage))
  localStorage.setItem("SelectMessage", JSON.stringify(arr));
}

export const startDialogThunk = (userId: number): ThunkType => async dispatch => {
  const response = await dialogsAPI.startDialogs(userId)
  if (response.resultCode === 0) {
    dispatch(getUserMessagesThunk(userId))
  }
}

export const newMessagesCountThunk = (): ThunkType => async dispatch => {
  const response = await dialogsAPI.newMessagesCount()
  if (response.status === 200) dispatch(actionsDialogs.newMessagesCount(response.data))
}

export default reduceDialogs;