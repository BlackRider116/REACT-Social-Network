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
    },
    deleteFollow(userId) {
        return instance
            .delete(`/follow/${userId}`)
    }
}

export const authAPI = {
    getAuth() {
        return instance
            .get(`/auth/me`)
    },
    login(email, password, rememberMe) {
        return instance
            .post(`/auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance
            .delete(`/auth/login`)
    },
}

export const profileAPI = {
    getProfile(userId) {
        return instance
            .get(`/profile/${userId}`)
    },
    getUserStatus(userId) {
        return instance
            .get(`/profile/status/${userId}`)
    },
    updateUserStatus(status) {
        return instance
            .put(`/profile/status/`, {status})
    },
    saveAvatarPhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance
            .put(`/profile/photo`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
    },
    saveProfileInfo(profileInfo) {
        return instance
            .put(`/profile`, profileInfo)
    }
}