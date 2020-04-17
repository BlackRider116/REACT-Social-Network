import { postsAPI, likeDislikeDeleteAPI, mediaApi, baseURL } from "../../api/apiMyBackend";
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType } from '../reduxStore';

const GET_POSTS = "/posts/seenPosts/GET_POSTS"
const SET_POSTS = "/posts/seenPosts/SET_POSTS"
const SET_LIKES = "/posts//likes/SET_LIKES"
const DELETE_POST = "/posts//DELETE_POST"
const ADD_POST = "/posts/ADD_POST"
const TEXT = "/posts/TEXT"

type AddPostFormDataType = {
  type: string
  file: string
}
let addPostFormData: AddPostFormDataType = {
  type: '',
  file: ''
} 

export type PostType = {
  id: number
  content: string
  type: string
  file: string
  likes?: number
}
const initialState = {
  posts: [] as Array<PostType>,
  firstSeenId: null as number | null,
  newPostsButton: true as boolean,
  lastSeenId: null as number | null,
  prevPostsButton: false as boolean,
  textPost: "" as string
}
type initialStateType = typeof initialState

const reduceNews = (state = initialState, action: ActionsTypes): initialStateType => {
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

type ActionsTypes = SetPostType | GetFirstPostsType | SetLikesType | DeletePostOfStateType | TextPostAddType | AddPostType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

type SetPostType = { type: typeof SET_POSTS, posts: Array<PostType>, lastSeenId: number, prevPostsButton: boolean }
const setPosts = (posts: Array<PostType>, lastSeenId: number, prevPostsButton: boolean): SetPostType => ({ type: SET_POSTS, posts, lastSeenId, prevPostsButton });

type GetFirstPostsType = { type: typeof GET_POSTS, payload: { posts: Array<PostType>, lastSeenId: number, prevPostsButton: boolean } }
const getFirstPosts = (posts: Array<PostType>, lastSeenId: number, prevPostsButton: boolean): GetFirstPostsType => ({ type: GET_POSTS, payload: { posts, lastSeenId, prevPostsButton } });

export const getMyPosts = (lastSeenId = 0): ThunkType => async (dispatch) => {
  const promise = await postsAPI.getPosts(lastSeenId)

  if (promise && promise.length !== 0) {
    const data = promise.reverse()
    const lastId = promise[promise.length - 1].id
    if (lastSeenId === 0) {
      if (promise.length < 5) {
        dispatch(getFirstPosts(data, lastId, false))
      } else {
        dispatch(getFirstPosts(data, lastId, true))
      }
    } else {
      if (promise.length < 5) {
        dispatch(setPosts(data, lastId, false))
      } else {
        dispatch(setPosts(data, lastId, true))
      }
    }
  }

}

type SetLikesType = {type: typeof SET_LIKES, postId: number, likes: number }
const setLikes = (postId: number, likes: number): SetLikesType => ({ type: SET_LIKES, postId, likes });

const likeDislikeDeletePost = (posts: Array<PostType>, postId: number, likes: number) => {
  return posts.map(post => {
    if (post.id === postId) {
      return { ...post, likes };
    }
    return post;
  })
}

export const likePost = (postId: number): ThunkType => async (dispatch) => {
  const data = await likeDislikeDeleteAPI.like(postId)
  dispatch(setLikes(postId, data.likes))
}

export const dislikePost = (postId: number): ThunkType => async (dispatch) => {
  const data = await likeDislikeDeleteAPI.dislike(postId)
  dispatch(setLikes(postId, data.likes))
}

type DeletePostOfStateType = {type: typeof DELETE_POST, postId: number}
const deletePostOfState = (postId: number): DeletePostOfStateType => ({ type: DELETE_POST, postId });

const deletePostFilter = (posts: Array<PostType>, postId: number) => {
  return posts.filter(post => post.id !== postId)
}

export const deletePost = (postId: number): ThunkType => async (dispatch) => {
  await likeDislikeDeleteAPI.delete(postId)
  dispatch(deletePostOfState(postId))
}

type TextPostAddType = {type: typeof TEXT, textPost: string}
export const textPostAdd = (textPost: string): TextPostAddType => ({ type: TEXT, textPost })

type AddPostType = { type: typeof ADD_POST, post: PostType}
const addPost = (post: PostType): AddPostType => ({ type: ADD_POST, post })

export const addPostThunk = (content: string): ThunkType => async (dispatch) => {

  const post = {
    id: 0,
    content,
    type: addPostFormData.type || '',
    file: addPostFormData.file || '',
  }

  addPostFormData = {
    type: '',
    file: ''
  }

  const promise = await postsAPI.addPost(post)
  dispatch(addPost(promise))
}

export const saveMediaFile = async (file: any, type: string) => {
  const response = await mediaApi.downloadFile(file)
  const postType = !type ? response.types : type

  addPostFormData = {
    type: postType,
    file: `${baseURL}/static/${response.name}`
  }
}

export default reduceNews;