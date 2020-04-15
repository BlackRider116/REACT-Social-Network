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
    login(email, password, rememberMe, captcha) {
        return instance
            .post(`/auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance
            .delete(`/auth/login`)
    },
    getCaptcha() {
        return instance
            .get(`security/get-captcha-url`)
    }
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

export const dialogsAPI = {
    startDialogs(userId) {
        return (
            instance.put(`dialogs/${userId}`).then(response => response.data)
        )
    },
    getAllDialogs() {
        return (
            instance.get(`dialogs/`).then(response => response.data)
        )
    },
    getListMessages(userId) {
        return (
            instance.get(`dialogs/${userId}/messages`).then(response => response.data)
        )
    },
    sendMessage(userId, message) {
        return (
            instance.post(`dialogs/${userId}/messages`, {body: message}).then(response => response.data)
        )
    },
    deleteMessage(messageId) {
        return (
            instance.delete(`dialogs/messages/${messageId}`).then(response => response.data)
        )
    }
};