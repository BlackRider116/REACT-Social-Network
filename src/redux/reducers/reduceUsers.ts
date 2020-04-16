import { usersAPI, followAPI } from "../../api/api";
import { filterPagesNumbers } from "../../common/Pagination/Pagination";
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType } from '../reduxStore';

const FOLLOW_UNFOLLOW = "/users/FOLLOW_UNFOLLOW";
const SET_USERS = "/users/SET_USERS";
const SET_NUMBER_PAGE = "/users/SET_NUMBER_PAGE";
const PAGES_NUMBERS = "/users/PAGES_NUMBERS";

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
    case FOLLOW_UNFOLLOW:
      return {
        ...state,
        users: followUnFollow(state.users, action.userId)
      };
    case SET_USERS:
    case SET_NUMBER_PAGE:
    case PAGES_NUMBERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

type ActionsTypes =  SetUsersType | setNumberPageType | FollowUnFollowType | PagesNumbersType
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

type SetUsersType = {type: typeof SET_USERS, payload: {users: Array<UsersType>, totalCount: number, isLoading: boolean, pagesNumbers: Array<number>, portionPagesNumbers: number}}
const setUsers = (users: Array<UsersType>, totalCount: number, isLoading: boolean, pagesNumbers: Array<number>, portionPagesNumbers: number): SetUsersType => 
({ type: SET_USERS, payload: { users, totalCount, isLoading, pagesNumbers, portionPagesNumbers } });
type setNumberPageType = {type: typeof SET_NUMBER_PAGE, payload: {numberPage: number, isLoading: boolean}}
const setNumberPage = (numberPage: number, isLoading: boolean): setNumberPageType => ({ type: SET_NUMBER_PAGE, payload: { numberPage, isLoading } });

export const getUsersThunk = (pageNumber = 1, portionPagesNumbers = 1): ThunkType => async (dispatch, getState) => {
  const usersCount = getState().usersPage.usersCount
  dispatch(setNumberPage(pageNumber, true))

  const response = await usersAPI.getUsers(usersCount, pageNumber)
  if (response.error === null) {
    const pagesNumbers = filterPagesNumbers(response.totalCount, usersCount, portionPagesNumbers)
    dispatch(setUsers(response.items, response.totalCount, false, pagesNumbers, portionPagesNumbers));
  }
}

type FollowUnFollowType = {type: typeof FOLLOW_UNFOLLOW, userId: number}
const followUnFollowAC = (userId: number): FollowUnFollowType => ({ type: FOLLOW_UNFOLLOW, userId });

export const followUnFollowThunk = (userId: number, followed: boolean): ThunkType => async (dispatch) => {
  const response = !followed ? await followAPI.postFollow(userId) : await followAPI.deleteFollow(userId)
  if (response.data.resultCode === 0) {
    dispatch(followUnFollowAC(userId));
  }
}

type PagesNumbersType = {type: typeof PAGES_NUMBERS, payload: { pagesNumbers: Array<number>, portionPagesNumbers: number }}
const pagesNumbersAC = (pagesNumbers: Array<number>, portionPagesNumbers: number): PagesNumbersType => ({ type: PAGES_NUMBERS, payload: { pagesNumbers, portionPagesNumbers } })

export const pagesNumbersThunk = (portionNumber: number): ThunkType => async (dispatch, getState) => {
  const usersCount = getState().usersPage.usersCount
  const totalCount = getState().usersPage.totalCount
  const pagesNumbers = filterPagesNumbers(totalCount, usersCount, portionNumber)
  dispatch(pagesNumbersAC(pagesNumbers, portionNumber))
}

export default reduceUsers;
