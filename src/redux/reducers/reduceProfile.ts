import { profileAPI, followAPI } from "../../api/api";
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType } from '../reduxStore';

const ADD_POST = "/profile/ADD-POST";
const SET_USER_PROFILE = "/profile/SET_USER_PROFILE";
const ON_FOLLOW = "/profile/ON_FOLLOW";
const SET_USER_STATUS = "/profile/SET_USER_STATUS"
const SAVE_PHOTO_SUCCESS = "/profile/SAVE_PHOTO_SUCCESS"
const PROFILE_UPDATE_SUCCESS = "/profile/PROFILE_UPDATE_SUCCESS"

type PostType = { id: number, postText: string, likes: number, src: string }
export type ProfileType = {
  aboutMe: string,
  contacts: {
    skype: string
    vk: string
    facebook: string
    icq: string
    email: string
    googlePlus: string
    twitter: string
    instagram: string
    whatsApp: string
  },
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  userId: number
  photos: {
    small: string
    large: string
  }
}

const initialState = {
  posts: [
    {
      id: 4, postText: "helo, how are you?", likes: 10, src: ''
    },
    {
      id: 3, postText: "hdfghghdfhdfh", likes: 15, src: ''
    },
    {
      id: 2, postText: "551++596", likes: 7, src: ''
    },
    {
      id: 1, postText: "helo", likes: 9, src: ''
    }
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  profileUpdate: null as boolean | null,
  status: "" as string,
  isFollow: false as boolean
};
type InitialStateType = typeof initialState

const reduceProfile = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
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

    case SET_USER_PROFILE:
    case PROFILE_UPDATE_SUCCESS:
    case SET_USER_STATUS:
    case ON_FOLLOW:
      return {
        ...state,
        ...action.payload
      };

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      };
    default:
      return state;
  }
};

type ActionsTypes = AddNewPostType | SetUserProfileType | SetUserStatusType | SaveProtoSuccessType | ProfileUpdateSuccessType | OnFollowType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

type AddNewPostType = { type: typeof ADD_POST, postText: string, photo: string }
export const addNewPost = (postText: string, photo: string): AddNewPostType => ({ type: ADD_POST, postText, photo });

type SetUserProfileType = { type: typeof SET_USER_PROFILE, payload: { profile: ProfileType, isFollow: boolean } }
const setUserProfile = (profile: ProfileType, isFollow: boolean): SetUserProfileType => ({ type: SET_USER_PROFILE, payload: { profile, isFollow } });

export const getProfileThunk = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getProfile(userId)
  const isFollow = await profileAPI.getIsFollow(userId)
  if (response.status === 200 && isFollow.status === 200) {
    dispatch(setUserProfile(response.data, isFollow.data));
  }
}

type SetUserStatusType = { type: typeof SET_USER_STATUS, payload: { status: string } }
const setUserStatus = (status: string): SetUserStatusType => ({ type: SET_USER_STATUS, payload: { status } })

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getUserStatus(userId)
  dispatch(setUserStatus(response.data));
}

type OnFollowType = { type: typeof ON_FOLLOW, payload: { isFollow: boolean } }
const onFollowAC = (isFollow: boolean): OnFollowType => ({ type: ON_FOLLOW, payload: { isFollow } })
export const onFollowThunk = (userId: number, isFollow: boolean): ThunkType => async dispatch => {
  const response = !isFollow ? await followAPI.postFollow(userId) : await followAPI.deleteFollow(userId)
  if(response.status === 200) dispatch(onFollowAC(!isFollow))
}


export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
  const response = await profileAPI.updateUserStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
}

type SaveProtoSuccessType = { type: typeof SAVE_PHOTO_SUCCESS, photos: any }
const saveProtoSuccess = (photos: any): SaveProtoSuccessType => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const savePhoto = (photoFile: any): ThunkType => async (dispatch) => {
  const response = await profileAPI.saveAvatarPhoto(photoFile)
  if (response.data.resultCode === 0) {
    dispatch(saveProtoSuccess(response.data.data.photos));
  }
}

type ProfileUpdateSuccessType = { type: typeof PROFILE_UPDATE_SUCCESS, payload: { profileUpdate: boolean | null } }
export const profileUpdateSuccess = (profileUpdate: boolean | null): ProfileUpdateSuccessType => ({ type: PROFILE_UPDATE_SUCCESS, payload: { profileUpdate } })


export const saveProfile = (profileInfo: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId || 0
  const response = await profileAPI.saveProfileInfo(profileInfo)
  if (response.data.resultCode === 0) {
    dispatch(getProfileThunk(userId))
    dispatch(profileUpdateSuccess(true))
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
    dispatch(profileUpdateSuccess(false))
  }
  setTimeout(() => {
    dispatch(profileUpdateSuccess(null))
  }, 1000);
}

export default reduceProfile;
