import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const INPUT_POST = "INPUT-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";

const initialState = {
  posts: [
    {
      id: 4,
      text: "helo, how are you?",
      likes: 10,
      src:
        "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
    },
    {
      id: 3,
      text: "hdfghghdfhdfh",
      likes: 15,
      src:
        "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
    },
    {
      id: 2,
      text: "551++596",
      likes: 7,
      src:
        "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
    },
    {
      id: 1,
      text: "helo",
      likes: 9,
      src:
        "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
    }
  ],
  inputPostText: "",
  profile: null,
};

const reduceProfile = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const text = state.inputPostText;
      const postId = state.posts[0].id;
      return {
        ...state,
        posts: [
          {
            id: postId + 1,
            text,
            likes: 0,
            src:
              "https://www.nastol.com.ua/download.php?img=201112/1280x1024/nastol.com.ua-12179.jpg"
          },
          ...state.posts
        ],
        inputPostText: ""
      };

    case INPUT_POST:
      return {
        ...state,
        inputPostText: action.textPost
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };

    default:
      return state;
  }
};

export const addPost = () => ({ type: ADD_POST });

export const inputPostText = post => ({
  type: INPUT_POST,
  textPost: post
});

const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  profile
});

export const getProfileThunk = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId).then(data => {
      dispatch(setUserProfile(data));
    });
  }
}

export default reduceProfile;
