import axios from 'axios';
import { ProfileType } from '../redux/reducers/reduceProfile';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers:
        { "API-KEY": "fc98c8d1-fcc0-4027-a270-97c3e19bdaad" }
})

export const usersAPI = {
   async getUsers(usersCount: number, numberPage: number) {
        return await instance.get(`/users?count=${usersCount}&page=${numberPage}`)
            .then(response => response.data)
    }
}

export const followAPI = {
    postFollow(userId: number) {
        return instance
            .post(`/follow/${userId}`)
    },
    deleteFollow(userId: number) {
        return instance
            .delete(`/follow/${userId}`)
    }
}

export const authAPI = {
    getAuth() {
        return instance
            .get(`/auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
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
    getProfile(userId: number) {
        return instance
            .get(`/profile/${userId}`)
    },
    getUserStatus(userId: number) {
        return instance
            .get(`/profile/status/${userId}`)
    },
    getIsFollow(userId: number) {
        return instance.get(`/follow/${userId}`)
    },
    updateUserStatus(status: string) {
        return instance
            .put(`/profile/status/`, {status})
    },
    saveAvatarPhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance
            .put(`/profile/photo`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
    },
    saveProfileInfo(profileInfo: ProfileType) {
        return instance
            .put(`/profile`, profileInfo)
    }
}

export const dialogsAPI = {
    startDialogs(userId: number) {
        return (
            instance.put(`dialogs/${userId}`).then(response => response.data)
        )
    },
    getAllDialogs() {
        return (
            instance.get(`dialogs/`).then(response => response.data)
        )
    },
    getListMessages(userId: number) {
        return (
            instance.get(`dialogs/${userId}/messages`).then(response => response.data)
        )
    },
    sendMessage(userId: number, message: string) {
        return (
            instance.post(`dialogs/${userId}/messages`, {body: message}).then(response => response.data)
        )
    },
    deleteMessage(messageId: string) {
        return (
            instance.delete(`dialogs/messages/${messageId}`).then(response => response.data)
        )
    },
    newMessagesCount() {
        return (
            instance.get(`dialogs/messages/new/count`)
        )
    },
};