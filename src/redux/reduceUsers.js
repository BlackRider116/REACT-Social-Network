import { usersAPI, followAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_NUMBER_PAGE = "SET_NUMBER_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const SET_LOADING = "SET_LOADING";

const initialState = {
  users: [],
  usersCount: 5,
  totalCount: 0,
  numberPage: 1,
  isLoading: false
};

const reduceUsers = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        })
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

const follow = userId => ({ type: FOLLOW, userId });
const unFollow = userId => ({ type: UNFOLLOW, userId });
const setUsers = users => ({ type: SET_USERS, users });
const setNumberPage = numberPage => ({ type: SET_NUMBER_PAGE, numberPage });
const setTotalCount = totalCount => ({ type: SET_TOTAL_COUNT, totalCount });
const setLoading = isLoading => ({ type: SET_LOADING, isLoading });

export const getUsersThunk = (usersCount, pageNumber) => {
  return (dispatch) => {
    if (pageNumber) { dispatch(setNumberPage(pageNumber)) };
    dispatch(setLoading(true));
    usersAPI.getUsers(usersCount, pageNumber)
      .then(data => {
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }
}

export const deleteFollowThunk = (userId) => {
  return (dispatch) => {
    followAPI.deleteFollow(userId).then(data => {
      if (data.resultCode === 0) {
        dispatch(unFollow(userId));
      }
    });
  }
}

export const postFollowThunk = (userId) => {
  return (dispatch) => {
    followAPI.postFollow(userId).then(data => {
      if (data.resultCode === 0) {
        dispatch(follow(userId));
      }
    });
  }
}

export default reduceUsers;
