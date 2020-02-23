import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers:
        { "API-KEY": "fc98c8d1-fcc0-4027-a270-97c3e19bdaad" }
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