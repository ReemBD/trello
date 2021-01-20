import { userService } from "../../services/userService"

export function setUser(user, isNewUser) {
    return async (dispatch) => {
        var loggedUser;
        try {
            if (isNewUser) loggedUser = await userService.signup(user)
            else loggedUser = await userService.login(user)
            const action = {
                type: 'SET_USER',
                loggedUser
            }
            dispatch(action)
        } catch (err) {
            console.log('had problem seting the user', err);
        }
    }
}


export function clearUser() {
    return (dispatch) => {
        const action = {
            type: 'CLEAR_USER',

        }
        dispatch(action)

    }
}