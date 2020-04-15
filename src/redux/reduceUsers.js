import { usersAPI, followAPI } from "../api/api";
import { filterPagesNumbers } from "../common/Pagination/Pagination";

const FOLLOW_UNFOLLOW = "/users/FOLLOW_UNFOLLOW";
const SET_USERS = "/users/SET_USERS";
const SET_NUMBER_PAGE = "/users/SET_NUMBER_PAGE";
const PAGES_NUMBERS = "/users/PAGES_NUMBERS";

const initialState = {
  users: [],
  usersCount: 10,
  totalCount: 0,
  numberPage: 1,
  isLoading: false,
  pagesNumbers: [],
  portionPagesNumbers: 1
};



const reduceUsers = (state = initialState, action) => {
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

const followUnFollow = (users, userId) => {
  return users.map(u => {
    if (u.id === userId) {
      const boolean = u.followed ? false : true
      return { ...u, followed: boolean };
    }
    return u;
  })
}


const setUsers = (users, totalCount, isLoading, pagesNumbers, portionPagesNumbers) => 
({ type: SET_USERS, payload: { users, totalCount, isLoading, pagesNumbers, portionPagesNumbers } });
const setNumberPage = (numberPage, isLoading) => ({ type: SET_NUMBER_PAGE, payload: { numberPage, isLoading } });

export const getUsersThunk = (pageNumber = 1, portionPagesNumbers = 1) => async (dispatch, getState) => {
  const usersCount = getState().usersPage.usersCount
  dispatch(setNumberPage(pageNumber, true))

  const response = await usersAPI.getUsers(usersCount, pageNumber)
  if (response.error === null) {
    const pagesNumbers = filterPagesNumbers(response.totalCount, usersCount, portionPagesNumbers)
    dispatch(setUsers(response.items, response.totalCount, false, pagesNumbers, portionPagesNumbers));
  }
}


const followUnFollowAC = userId => ({ type: FOLLOW_UNFOLLOW, userId });

export const followUnFollowThunk = (userId, followed) => async (dispatch) => {
  const response = !followed ? await followAPI.postFollow(userId) : await followAPI.deleteFollow(userId)
  if (response.data.resultCode === 0) {
    dispatch(followUnFollowAC(userId));
  }
}


const pagesNumbersAC = (pagesNumbers, portionPagesNumbers) => ({ type: PAGES_NUMBERS, payload: { pagesNumbers, portionPagesNumbers } })

export const pagesNumbersThunk = portionNumber =>  (dispatch, getState) => {
  const usersCount = getState().usersPage.usersCount
  const totalCount = getState().usersPage.totalCount
  const pagesNumbers =  filterPagesNumbers(totalCount, usersCount, portionNumber)
  dispatch(pagesNumbersAC(pagesNumbers, portionNumber))
}


export default reduceUsers;
