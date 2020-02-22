import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers:
        { "API-KEY": "c1c42f49-7b11-422a-ad21-2e9ec6e8ecdb" }
})

export const usersAPI = {
    getUsers(usersCount, numberPage) {
        return instance.get(`/users?count=${usersCount}&page=${numberPage}`)
            .then(response => response.data)
    }
}

export const followAPI = {
    postFollow(userId) {
        return instance
            .post(`/follow/${userId}`)
            .then(response => response.data)
    },
    deleteFollow(userId) {
        return instance
            .delete(`/follow/${userId}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    getAuth() {
        return instance
            .get(`/auth/me`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance
            .get(`/profile/${userId}`)
            .then(response => response.data)
    }
}