import { postsAPI, likeDislikeDeleteAPI, mediaApi, baseURL } from "../api/apiMyBackend";

const GET_POSTS = "/posts/seenPosts/GET_POSTS"
const SET_POSTS = "/posts/seenPosts/SET_POSTS"
const SET_LIKES = "/posts//likes/SET_LIKES"
const DELETE_POST = "/posts//DELETE_POST"
const ADD_POST = "/posts/ADD_POST"
const TEXT = "/posts/TEXT"

let addPostFormData = {}
//   type: '',
//   file: ''
// }

const initialState = {
  posts: [],
  firstSeenId: null,
  newPostsButton: true,
  lastSeenId: null,
  prevPostsButton: false,
  textPost: ""
}

const reduceNews = (state = initialState, action) => {
  switch (action.type) {
    case TEXT:
      return {
        ...state,
        textPost: action.textPost
      };
    case GET_POSTS:
      return {
        ...state,
        ...action.payload
      }
    case SET_POSTS:
      return {
        ...state,
        posts: [
          ...state.posts,
          ...action.posts
        ],
        lastSeenId: action.lastSeenId,
        prevPostsButton: action.prevPostsButton
      };
    case SET_LIKES:
      return {
        ...state,
        posts: likeDislikeDeletePost(state.posts, action.postId, action.likes)
      }
    case DELETE_POST:
      return {
        ...state,
        posts: deletePostFilter(state.posts, action.postId)
      }
    case ADD_POST:
      return {
        ...state,
        posts: [
          action.post,
          ...state.posts
        ],
        textPost: ''
      }
    default:
      return state;
  }
};

const setPosts = (posts, lastSeenId, prevPostsButton) => ({ type: SET_POSTS, posts, lastSeenId, prevPostsButton });
const getFirstPosts = (posts, lastSeenId, prevPostsButton) => ({ type: GET_POSTS, payload: { posts, lastSeenId, prevPostsButton } });

export const getMyPosts = (lastSeenId = 0) => async (dispatch) => {
  const promise = await postsAPI.getPosts(lastSeenId)
  if (promise.length !== 0) {
    const data = [promise.reverse(), promise[promise.length - 1].id]
    if (lastSeenId === 0) {
      if (promise.length < 5) {
        dispatch(getFirstPosts(...data, false))
      } else {
        dispatch(getFirstPosts(...data, true))
      }
    } else {
      if (promise.length < 5) {
        dispatch(setPosts(...data, false))
      } else {
        dispatch(setPosts(...data, true))
      }
    }
  }
}


const setLikes = (postId, likes) => ({ type: SET_LIKES, postId, likes });

const likeDislikeDeletePost = (posts, postId, likes) => {
  return posts.map(post => {
    if (post.id === postId) {
      return { ...post, likes };
    }
    return post;
  })
}

export const likePost = (postId) => async (dispatch) => {
  const data = await likeDislikeDeleteAPI.like(postId)
  dispatch(setLikes(postId, data.likes))
}

export const dislikePost = (postId) => async (dispatch) => {
  const data = await likeDislikeDeleteAPI.dislike(postId)
  dispatch(setLikes(postId, data.likes))
}

const deletePostOfState = (postId) => ({ type: DELETE_POST, postId });

const deletePostFilter = (posts, postId) => {
  return posts.filter(post => post.id !== postId)
}

export const deletePost = (postId) => async (dispatch) => {
  await likeDislikeDeleteAPI.delete(postId)
  dispatch(deletePostOfState(postId))
}

export const textPostAdd = textPost => ({ type: TEXT, textPost })
const addPost = post => ({ type: ADD_POST, post })
export const addPostThunk = (content) => async (dispatch) => {

  const post = {
    id: 0,
    content,
    type: addPostFormData.type || '',
    file: addPostFormData.file || '',
  }

  addPostFormData = {}

  const promise = await postsAPI.addPost(post)
  dispatch(addPost(promise))
}

export const saveMediaFile = async (file) => {
  const response = await mediaApi.downloadFile(file)
  addPostFormData = {
    type: response.data.types,
    file: `${baseURL}/static/${response.data.name}`
  }
}

export default reduceNews;