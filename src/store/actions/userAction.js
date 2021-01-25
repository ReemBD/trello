<<<<<<< HEAD
import { sessionService } from "../../services/sessionStorageService";
import { userService } from "../../services/userService"

export function setUser(user, isNewUser, isGoogle) {
    return async (dispatch) => {
        var loggedUser;
        try {
            if (isNewUser) loggedUser = await userService.signup(user, isGoogle)
            else loggedUser = await userService.login(user)
            // delete loggedUser.password
            const action = {
                type: 'SET_USER',
                loggedUser
            }
sessionService.store('loggedUserDB',loggedUser)
            dispatch(action)
        } catch (err) {
            console.log('had problem seting the user', err);
        }
=======
import { userService } from "../../services/userService";

export function setUser(user, isNewUser, isGoogle) {
  return async (dispatch) => {
    let loggedUser;
    try {
      console.log("from action", user);
      if (isNewUser) loggedUser = await userService.signup(user, isGoogle);
      else loggedUser = await userService.login(user);
      if (!loggedUser) throw new Error("error");
      delete loggedUser.password;
      const action = {
        type: "SET_USER",
        loggedUser,
      };
      dispatch(action);
    } catch (err) {
      console.log("had problem seting the user", err);
>>>>>>> 5f6dcb7cbc8fc7aa36a620c177b1c87d43559cde
    }
  };
}

export function clearUser() {
<<<<<<< HEAD
    return (dispatch) => {
        const action = {
            type: 'CLEAR_USER',

        }
        dispatch(action)
        sessionService.clear()
    }
}
=======
  return (dispatch) => {
    const action = {
      type: "CLEAR_USER",
    };
    dispatch(action);
  };
}
>>>>>>> 5f6dcb7cbc8fc7aa36a620c177b1c87d43559cde
