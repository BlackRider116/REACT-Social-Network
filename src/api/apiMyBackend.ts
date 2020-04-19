import axios from 'axios';
import { NewsPostType } from '../redux/reducers/reduceNews';

export const baseURL = 'https://backend-dz11.herokuapp.com'
// export const baseURL = 'http://localhost:9999'

const instance = axios.create({
    baseURL,
    headers:
        { 'Content-Type': 'application/json' },
})

export const postsAPI = {
    async getPosts(lastSeenId: number) {
        return await instance.get(`/posts/seenPosts/${lastSeenId}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
    async newPosts(firstSeenId: number) {
        return await instance.get(`/posts/${firstSeenId}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
    async addPost(post: NewsPostType) {
        return await instance.post(`/posts`, JSON.stringify(post))
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
}

export const likeDislikeDeleteAPI = {
    async like(postId: number) {
        return await instance.post(`/posts/${postId}/likes`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
    async dislike(postId: number) {
        return await instance.delete(`/posts/${postId}/likes`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
    async delete(postId: number) {
        return await instance.delete(`/posts/${postId}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    }
}

export const mediaApi = {
    async downloadFile(file: File | Blob) {
        const formData = new FormData();
        formData.append("media", file);
        return await instance.post(`/upload`, formData).then(response => response.data)
    },
}