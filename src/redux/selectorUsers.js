import { createSelector } from "reselect"

export const getUsers = (state) => {
    return state.usersPage.users
}

// export const getUsersSelector = createSelector(getUsers, 
//     (users)=>{
//         return users.filter(u => true)
// })

export const getUsersCount = (state) => {
    return state.usersPage.usersCount
}

export const getTotalCount = (state) => {
    return state.usersPage.totalCount
}

export const getNumberPage = (state) => {
    return state.usersPage.numberPage
}

export const getIsLoading = (state) => {
    return state.usersPage.isLoading
}