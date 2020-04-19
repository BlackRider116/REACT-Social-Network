import { InferActionsTypes } from './../reduxStore';
import { profileAPI, followAPI } from "../../api/api";
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType } from '../reduxStore';
import { setAvatarThunk } from './reduceAuth';

export type PostType = { id: number, postText: string, likes: number, src: string | null }

export type ProfileType = {
  aboutMe: string | null
  contacts: {
    skype: string | null
    vk: string | null
    facebook: string | null
    icq: string | null
    email: string | null
    googlePlus: string | null
    twitter: string | null
    instagram: string | null
    whatsApp: string | null
  },
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string | null
  userId: number
  photos: {
    small: string | null
    large: string | null
  }
}

const localMyPosts = JSON.parse(localStorage.getItem("MyPosts") || "[]")

const initialState = {
  posts: localMyPosts.length === 0 ? [
    {
      id: 4, postText: "К сожалению посты еще не реализованы в бэкенде. Поэтому для того 'чтобы потыкать' сделал временную реализацию через localStorage. Ниже есть кнопка очистки localStorage", likes: 10, src: ''
    },
    {
      id: 3, postText: "Уверен, что хорошо))", likes: 15, src: ''
    },
    {
      id: 2, postText: "Как ваши дела?", likes: 7, src: ''
    },
    {
      id: 1, postText: "Привет)", likes: 9, src: ''
    }
  ] : localMyPosts as Array<PostType>,
  profile: null as ProfileType | null,
  profileUpdate: null as boolean | null,
  status: "" as string,
  isFollow: false as boolean
};
type InitialStateType = typeof initialState

const reduceProfile = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case '/profile/SET_USER_PROFILE':
    case '/profile/PROFILE_UPDATE_SUCCESS':
    case '/profile/SET_USER_STATUS':
    case '/profile/ON_FOLLOW':
      return {
        ...state,
        ...action.payload
      };
    case '/profile/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      };

    case '/profile/ADD_POST':
      return {
        ...state,
        posts: [
          {
            id: state.posts[0].id + 1,
            postText: action.postText,
            likes: 0,
            src: action.photo
          },
          ...state.posts
        ],
      };

    case "/profile/LIKE_DISLIKE":
      return {
        ...state,
        posts: filterLikes(state.posts, action.postId, action.boolean)
      }
    case "/profile/DELETE_MY_POST":
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== action.postId)
      }
    case "/profile/DELETE_ALL_MY_POSTS":
      return {
        ...state,
        posts: []
      }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actionsProfile>
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

export const actionsProfile = {
  setUserProfile: (profile: ProfileType, isFollow: boolean) => ({ type: '/profile/SET_USER_PROFILE', payload: { profile, isFollow } } as const),
  setUserStatus: (status: string) => ({ type: '/profile/SET_USER_STATUS', payload: { status } } as const),
  onFollowAC: (isFollow: boolean) => ({ type: '/profile/ON_FOLLOW', payload: { isFollow } } as const),
  saveProtoSuccess: (photos: any) => ({ type: '/profile/SAVE_PHOTO_SUCCESS', photos } as const),
  profileUpdateSuccess: (profileUpdate: boolean | null) => ({ type: '/profile/PROFILE_UPDATE_SUCCESS', payload: { profileUpdate } } as const),
  addNewPost: (postText: string, photo: string | null) => ({ type: '/profile/ADD_POST', postText, photo } as const),
  likeDislikeMyPost: (postId: number, boolean: boolean) => ({ type: '/profile/LIKE_DISLIKE', postId, boolean } as const),
  deleteMyPost: (postId: number) => ({ type: '/profile/DELETE_MY_POST', postId } as const),
  deleteAllMyPosts: () => ({ type: '/profile/DELETE_ALL_MY_POSTS' } as const)
}

export const getProfileThunk = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getProfile(userId)
  const isFollow = await profileAPI.getIsFollow(userId)
  if (response.status === 200 && isFollow.status === 200) {
    dispatch(actionsProfile.setUserProfile(response.data, isFollow.data));
  }
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getUserStatus(userId)
  if (response.status === 200) dispatch(actionsProfile.setUserStatus(response.data));
}

export const onFollowThunk = (userId: number, isFollow: boolean): ThunkType => async dispatch => {
  const response = !isFollow ? await followAPI.postFollow(userId) : await followAPI.deleteFollow(userId)
  if (response.status === 200) dispatch(actionsProfile.onFollowAC(!isFollow))
}


export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
  const response = await profileAPI.updateUserStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(actionsProfile.setUserStatus(status));
  }
}

export const savePhoto = (photoFile: File): ThunkType => async (dispatch) => {
  const response = await profileAPI.saveAvatarPhoto(photoFile)
  if (response.data.resultCode === 0) {
    dispatch(actionsProfile.saveProtoSuccess(response.data.data.photos))
    dispatch(setAvatarThunk())
  }
}

export const saveProfile = (profileInfo: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId || 0
  const response = await profileAPI.saveProfileInfo(profileInfo)
  if (response.data.resultCode === 0) {
    dispatch(getProfileThunk(userId))
    dispatch(actionsProfile.profileUpdateSuccess(true))
  } else {
    const errText = '   Invalid url format'
    const responseError = response.data.messages[0].toLowerCase().slice(30, -1)
    const stopSubmitErr = [{ facebook: errText }, { website: errText }, { vk: errText }, { twitter: errText }, { instagram: errText }, { youtube: errText }, { github: errText }, { mainLink: errText }]
    const contact = [{ name: 'facebook', id: 0 }, { name: 'website', id: 1 }, { name: 'vk', id: 2 }, { name: 'twitter', id: 3 }, { name: 'instagram', id: 4 }, { name: 'youtube', id: 5 }, { name: 'github', id: 6 }, { name: 'mainlink', id: 7 }]
    let errUrlFormat = {}
    for (let item of contact) {
      if (item.name === responseError) {
        errUrlFormat = stopSubmitErr[item.id]
      }
    }
    //@ts-ignore
    dispatch(stopSubmit("profileUserInfo", { contacts: errUrlFormat }))
    dispatch(actionsProfile.profileUpdateSuccess(false))
  }
  setTimeout(() => {
    dispatch(actionsProfile.profileUpdateSuccess(null))
  }, 1000);
}

export const likeDislikeMyPost = (postId: number, boolean: boolean): ThunkType => async dispatch => {
  dispatch(actionsProfile.likeDislikeMyPost(postId, boolean))
}

const filterLikes = (statePosts: Array<PostType>, postId: number, boolean: boolean) => {
  return statePosts.map(item => {
    if (item.id === postId) {
      const newItem = boolean ? { ...item, likes: item.likes + 1 } : { ...item, likes: item.likes - 1 }
      return newItem
    }
    return item
  })
}

export default reduceProfile;
