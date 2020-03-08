import { postsAPI, likeDislikeDeleteAPI } from "../api/apiMyBackend";

const START_GET_POST = "/posts/seenPosts/START_GET_POST"
const LAST_SEEN_ID = "/posts/seenPosts/LAST_SEEN_ID"
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
    case LAST_SEEN_ID:
      return {
        ...state,
        posts: [
          ...state.posts,
          ...action.posts
        ],
        lastSeenId: action.lastSeenId
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
      if (!state.posts) {
        return {
          ...state,
          posts: [
            action.post,
          ],
          textPost: ''
        }
      }
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

const setPosts = (posts, lastSeenId) => ({ type: START_GET_POST, payload: { posts, lastSeenId } });

const setLastPosts = (posts, lastSeenId) => ({ type: LAST_SEEN_ID, posts, lastSeenId });

export const getMyPosts = (lastSeenId = 0) => async (dispatch) => {
  const data = await postsAPI.getPosts(lastSeenId)
  if (lastSeenId !== 0) {
    dispatch(setLastPosts(data.reverse(), data[data.length - 1].id))
  }
  else {
    if (data.length !== 0) {
      dispatch(setPosts(data.reverse(), data[data.length - 1].id))
    } else {
      dispatch(setPosts(null, 0))
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
    // type: undefined,
    // file: undefined,
  }

  const promise = await postsAPI.addPost(post)
  dispatch(addPost(promise))
}


export default reduceNews;