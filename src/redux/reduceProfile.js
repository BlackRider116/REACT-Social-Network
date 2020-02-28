import { profileAPI } from "../api/api";

const ADD_POST = "/profile/ADD-POST";
const SET_USER_PROFILE = "/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "/profile/SET_USER_STATUS"
const SAVE_PHOTO_SUCCESS = "/profile/SAVE_PHOTO_SUCCESS"

const initialState = {
  posts: [
    {
      id: 4,
      postText: "helo, how are you?",
      likes: 10,
      src:
        "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
    },
    {
      id: 3,
      postText: "hdfghghdfhdfh",
      likes: 15,
      src:
        "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
    },
    {
      id: 2,
      postText: "551++596",
      likes: 7,
      src:
        "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
    },
    {
      id: 1,
      postText: "helo",
      likes: 9,
      src:
        "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
    }
  ],
  profile: null,
  status: ""
};

const reduceProfile = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const postId = state.posts[0].id;
      return {
        ...state,
        posts: [
          {
            id: postId + 1,
            postText: action.postText.newPost,
            likes: 0,
            src:
              "https://www.nastol.com.ua/download.php?img=201112/1280x1024/nastol.com.ua-12179.jpg"
          },
          ...state.posts
        ],
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };

    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
      };
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      };

    default:
      return state;
  }
};

export const addNewPost = (postText) => ({ type: ADD_POST, postText });

const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  profile
});

export const getProfileThunk = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId)
      .then(promise => {
        dispatch(setUserProfile(promise.data));
      });
  }
}

const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status
})

export const getUserStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getUserStatus(userId)
  dispatch(setUserStatus(response.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateUserStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
}

const saveProtoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const savePhoto = (photoFile) => async (dispatch) => {
  const response = await profileAPI.saveAvatarPhoto(photoFile)
  if (response.data.resultCode === 0) {
    dispatch(saveProtoSuccess(response.data.data.photos));
  }
}

export default reduceProfile;
