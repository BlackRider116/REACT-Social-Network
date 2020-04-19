import { postsAPI, likeDislikeDeleteAPI, mediaApi, baseURL } from "../../api/apiMyBackend";
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType, InferActionsTypes } from '../reduxStore';

type AddPostFormDataType = {
  type: string | null
  file: string | null
}
let addPostFormData: AddPostFormDataType = {
  type: null,
  file: null
}

export type NewsPostType = {
  id: number
  content: string
  type: string
  file: string
  likes?: number
}
const initialState = {
  posts: [] as Array<NewsPostType>,
  firstSeenId: null as number | null,
  newPostsButton: true as boolean,
  lastSeenId: 0 as number,
  prevPostsButton: false as boolean,
  textPost: "" as string
}
type initialStateType = typeof initialState

const reduceNews = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case '/news/TEXT':
      return {
        ...state,
        textPost: action.textPost
      };
    case '/news/GET_POSTS':
      return {
        ...state,
        ...action.payload
      }
    case '/news/SET_POSTS':
      return {
        ...state,
        posts: [
          ...state.posts,
          ...action.posts
        ],
        lastSeenId: action.lastSeenId,
        prevPostsButton: action.prevPostsButton
      };
    case '/news/SET_LIKES':
      return {
        ...state,
        posts: likeDislikeDeletePost(state.posts, action.postId, action.likes)
      }
    case '/news/DELETE_POST':
      return {
        ...state,
        posts: deletePostFilter(state.posts, action.postId)
      }
    case '/news/ADD_POST':
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

type ActionsTypes = InferActionsTypes<typeof actionsNews>
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

export const actionsNews = {
  setPosts: (posts: Array<NewsPostType>, lastSeenId: number, prevPostsButton: boolean) => ({ type: '/news/SET_POSTS', posts, lastSeenId, prevPostsButton } as const),
  getFirstPosts: (posts: Array<NewsPostType>, lastSeenId: number, prevPostsButton: boolean) => ({ type: '/news/GET_POSTS', payload: { posts, lastSeenId, prevPostsButton } } as const),
  setLikes: (postId: number, likes: number) => ({ type: '/news/SET_LIKES', postId, likes } as const),
  deletePostOfState: (postId: number) => ({ type: '/news/DELETE_POST', postId } as const),
  textPostAdd: (textPost: string) => ({ type: '/news/TEXT', textPost } as const),
  addPost: (post: NewsPostType) => ({ type: '/news/ADD_POST', post } as const)
}

export const getMyPosts = (lastSeenId = 0): ThunkType => async (dispatch) => {
  const promise = await postsAPI.getPosts(lastSeenId)

  if (promise && promise.length !== 0) {
    const data = promise.reverse()
    const lastId = promise[promise.length - 1].id
    if (lastSeenId === 0) {
      if (promise.length < 5) {
        dispatch(actionsNews.getFirstPosts(data, lastId, false))
      } else {
        dispatch(actionsNews.getFirstPosts(data, lastId, true))
      }
    } else {
      if (promise.length < 5) {
        dispatch(actionsNews.setPosts(data, lastId, false))
      } else {
        dispatch(actionsNews.setPosts(data, lastId, true))
      }
    }
  }

}

const likeDislikeDeletePost = (posts: Array<NewsPostType>, postId: number, likes: number) => {
  return posts.map(post => {
    if (post.id === postId) {
      return { ...post, likes };
    }
    return post;
  })
}

export const likePost = (postId: number): ThunkType => async (dispatch) => {
  const data = await likeDislikeDeleteAPI.like(postId)
  dispatch(actionsNews.setLikes(postId, data.likes))
}

export const dislikePost = (postId: number): ThunkType => async (dispatch) => {
  const data = await likeDislikeDeleteAPI.dislike(postId)
  dispatch(actionsNews.setLikes(postId, data.likes))
}

const deletePostFilter = (posts: Array<NewsPostType>, postId: number) => {
  return posts.filter(post => post.id !== postId)
}

export const deletePost = (postId: number): ThunkType => async (dispatch) => {
  await likeDislikeDeleteAPI.delete(postId)
  dispatch(actionsNews.deletePostOfState(postId))
}


export const addPostThunk = (content: string): ThunkType => async (dispatch) => {

  const post = {
    id: 0,
    content,
    type: addPostFormData.type || '',
    file: addPostFormData.file || '',
  }

  if (content || addPostFormData.type !== null) {
    const promise = await postsAPI.addPost(post)
    dispatch(actionsNews.addPost(promise))
  }
  addPostFormData = {
    type: null,
    file: null
  }
}

export const saveMediaFile = async (file: File | Blob, type: string) => {
  const response = await mediaApi.downloadFile(file)
  const postType = !type ? response.types : type

  addPostFormData = {
    type: postType,
    file: `${baseURL}/static/${response.name}`
  }
}

export default reduceNews;