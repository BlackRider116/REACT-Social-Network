import { postsAPI, likeDislikeDeleteAPI } from "../api/apiMyBackend";

const START_GET_POST = "/posts/seenPosts/START_GET_POST"
const SET_LIKES = "/posts//likes/SET_LIKES"
const DELETE_POST = "/posts//DELETE_POST"
const ADD_POST = "/posts/ADD_POST"
const TEXT = "/posts/TEXT"

const initialState = {
  posts: null,
  firstSeenId: null,
  lastSeenId: null,
  textPost: ""
}

const reduceNews = (state = initialState, action) => {
  switch (action.type) {
    case TEXT:
      return {
        ...state,
        textPost: action.textPost
      };
    case START_GET_POST:
      return {
        ...state,
        ...action.payload
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
console.log(action.payload)
      return {
        ...state,
        posts: [
          {
           ...action.payload.post
          },
          ...state.posts
        ],
        textPost: ''
      }
    default:
      return state;
  }
};

const setStartPosts = (posts, lastSeenId) => ({ type: START_GET_POST, payload: { posts, lastSeenId } });

export const startGetPosts = () => async (dispatch) => {
  const data = await postsAPI.startGet()
  if (data.length !== 0) {
    if (data.length >= 5) {
      dispatch(setStartPosts(data.reverse(), data[data.length - 5].id))
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


export const textPostAdd = textPost => ({type: TEXT, textPost})
const addPost = post => ({type: ADD_POST, payload: {post}})
export const addPostThunk = (content) => async (dispatch) => {
  const post = {
    id: 0,
    content,
    // type: undefined,
    // file: undefined,
}
  const promise = await postsAPI.addPost(post)
  dispatch(addPost(promise))
}

export default reduceNews;