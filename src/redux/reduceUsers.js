import { usersAPI, followAPI } from "../api/api";

const FOLLOW = "/users/FOLLOW";
const UNFOLLOW = "/users/UNFOLLOW";
const SET_USERS = "/users/SET_USERS";
const SET_NUMBER_PAGE = "/users/SET_NUMBER_PAGE";
const SET_TOTAL_COUNT = "/users/SET_TOTAL_COUNT";
const SET_LOADING = "/users/SET_LOADING";

const initialState = {
  users: [],
  usersCount: 10,
  totalCount: 0,
  numberPage: 1,
  isLoading: false
};



const reduceUsers = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
     
      return {
        ...state,
        users: followUnfollow(state.users, action.userId, true)
      };

    case UNFOLLOW:
      return {
        ...state,
        users: followUnfollow(state.users, action.userId, false)
      };

    case SET_USERS:
      return { ...state, users: action.users };

    case SET_NUMBER_PAGE:
      return { ...state, numberPage: action.numberPage };

    case SET_TOTAL_COUNT:
      return { ...state, totalCount: action.totalCount };

    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };

    default:
      return state;
  }
};

const followUnfollow = (users, userId, boolean) => {
  return users.map(u => {
      if (u.id === userId) {
        return { ...u, followed: boolean };
      }
      return u;
    })
}

const follow = userId => ({ type: FOLLOW, userId });
const unFollow = userId => ({ type: UNFOLLOW, userId });
const setUsers = users => ({ type: SET_USERS, users });
const setNumberPage = numberPage => ({ type: SET_NUMBER_PAGE, numberPage });
const setTotalCount = totalCount => ({ type: SET_TOTAL_COUNT, totalCount });
const setLoading = isLoading => ({ type: SET_LOADING, isLoading });

export const getUsersThunk = (usersCount, pageNumber) => async (dispatch) => {
  if(pageNumber){dispatch(setNumberPage(pageNumber))}
  dispatch(setLoading(true));

  const response = await usersAPI.getUsers(usersCount, pageNumber)

  dispatch(setUsers(response.items));
  dispatch(setTotalCount(response.totalCount));

  dispatch(setLoading(false));
}

export const postFollowThunk = (userId) => async (dispatch) => {
  const response = await followAPI.postFollow(userId)

  if (response.data.resultCode === 0) {
    dispatch(follow(userId));
  }
}


export const deleteFollowThunk = (userId) => async (dispatch) => {
  const response = await followAPI.deleteFollow(userId)

  if (response.data.resultCode === 0) {
    dispatch(unFollow(userId));
  }
}

export default reduceUsers;
