import * as axios from 'axios';

// export const baseURL = 'https://backend-dz11.herokuapp.com'
export const baseURL = 'http://localhost:9999'

const instance = axios.create({
    baseURL,
    headers:
        { 'Content-Type': 'application/json' },
})

export const postsAPI = {
    getPosts(lastSeenId) {
        return instance.get(`/posts/seenPosts/${lastSeenId}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
    newPosts(firstSeenId) {
        return instance.get(`/posts/${firstSeenId}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
    addPost(post) {
        return instance.post(`/posts`, JSON.stringify(post))
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
}

export const likeDislikeDeleteAPI = {
    like(postId) {
        return instance.post(`/posts/${postId}/likes`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
    dislike(postId) {
        return instance.delete(`/posts/${postId}/likes`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
    delete(postId) {
        return instance.delete(`/posts/${postId}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    }
}

export const mediaApi = {
    downloadFile(file) {
        const formData = new FormData();
        formData.append("media", file);
        return instance.post(`/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(response => response.data)
    },
}