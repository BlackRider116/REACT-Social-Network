import { usersAPI, followAPI } from "../../api/api";
import { filterPagesNumbers } from "../../common/Pagination/Pagination";
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType, InferActionsTypes } from '../reduxStore';

export type UsersType = {
  name: string
  id: number
  uniqueUrlName: null | any,
  photos: {
    small: null | string,
    large: null | string
  },
  status: null | string,
  followed: boolean
}

const initialState = {
  users: [] as Array<UsersType>,
  usersCount: 10 as number,
  totalCount: 0 as number,
  numberPage: 1 as number,
  isLoading: false as boolean,
  pagesNumbers: [] as Array<number>,
  portionPagesNumbers: 1 as number,
};
type InitialStateType = typeof initialState

const reduceUsers = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case '/users/FOLLOW_UNFOLLOW':
      return {
        ...state,
        users: followUnFollow(state.users, action.userId)
      };
    case '/users/SET_USERS':
    case '/users/SET_NUMBER_PAGE':
    case '/users/PAGES_NUMBERS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actionsUser>
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

const followUnFollow = (users: Array<UsersType>, userId: number) => {
  return users.map(u => {
    if (u.id === userId) {
      const boolean = u.followed ? false : true
      return { ...u, followed: boolean };
    }
    return u;
  })
}

const actionsUser = {
  setUsers: (users: Array<UsersType>, totalCount: number, isLoading: boolean, pagesNumbers: Array<number>, portionPagesNumbers: number) =>
    ({ type: '/users/SET_USERS', payload: { users, totalCount, isLoading, pagesNumbers, portionPagesNumbers } } as const),
  setNumberPage: (numberPage: number, isLoading: boolean) => ({ type: '/users/SET_NUMBER_PAGE', payload: { numberPage, isLoading } } as const),
  followUnFollowAC: (userId: number) => ({ type: '/users/FOLLOW_UNFOLLOW', userId } as const),
  pagesNumbersAC: (pagesNumbers: Array<number>, portionPagesNumbers: number) => ({ type: '/users/PAGES_NUMBERS', payload: { pagesNumbers, portionPagesNumbers } } as const)
}

export const getUsersThunk = (pageNumber = 1, portionPagesNumbers = 1): ThunkType => async (dispatch, getState) => {
  const usersCount = getState().usersPage.usersCount
  dispatch(actionsUser.setNumberPage(pageNumber, true))

  const response = await usersAPI.getUsers(usersCount, pageNumber)
  if (response.error === null) {
    const pagesNumbers = filterPagesNumbers(response.totalCount, usersCount, portionPagesNumbers)
    dispatch(actionsUser.setUsers(response.items, response.totalCount, false, pagesNumbers, portionPagesNumbers));
  }
}

export const followUnFollowThunk = (userId: number, followed: boolean): ThunkType => async (dispatch) => {
  const response = followed === true ? await followAPI.deleteFollow(userId) : await followAPI.postFollow(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionsUser.followUnFollowAC(userId));
  }
}

export const pagesNumbersThunk = (portionNumber: number): ThunkType => async (dispatch, getState) => {
  const usersCount = getState().usersPage.usersCount
  const totalCount = getState().usersPage.totalCount
  const pagesNumbers = filterPagesNumbers(totalCount, usersCount, portionNumber)
  dispatch(actionsUser.pagesNumbersAC(pagesNumbers, portionNumber))
}

export default reduceUsers;
