<<<<<<< HEAD
import { httpService } from './httpService'
import { sessionService } from './sessionStorageService'
const endpoint = 'user'
const KEY = 'loggedUserDB'
   
export const userService = {
    getUsers,
    login,
    signup,
    filterUsersBy,
    checkLoggedUser

}
=======
import { httpService } from "./httpService";
const endpoint = "user";

export const userService = {
  getUsers,
  login,
  signup,
  filterUsersBy,
};
>>>>>>> 5f6dcb7cbc8fc7aa36a620c177b1c87d43559cde

async function getUsers() {
  const users = await httpService.get(endpoint);
  return users;
}

async function login(user) {
<<<<<<< HEAD
    let loggedUser;
    try {
        loggedUser = await httpService.post(`${endpoint}/login/?password=${user.password}&username=${user.username}`)
        delete loggedUser.password
        sessionService.store(KEY, loggedUser)
        console.log('logged', loggedUser);
    } catch (err) {
        console.log('couldnt find user');
    }
    return loggedUser
}

async function signup(user, isGoogle) {
    console.log('userrrr', user);
    try {
        const newUser = await httpService.post(`${endpoint}/signup`, { user, isGoogle })
        delete newUser.password
        sessionService.store(KEY, newUser)
        return user
    } catch (err) {
        console.log('problem signing in ', err);
    }
=======
  let loggedUser;
  try {
    loggedUser = await httpService.post(
      `${endpoint}/login?password=${user.password}&username=${user.username}`
    );
    console.log("logged", loggedUser);
  } catch (err) {
    console.log("couldnt find user");
  }
  return loggedUser;
}

async function signup(user, isGoogle) {
  console.log("userrrr", user);
  try {
    await httpService.post(`${endpoint}/signup`, { user, isGoogle });
    return user;
  } catch (err) {
    console.log("problem signing in ", err);
  }
>>>>>>> 5f6dcb7cbc8fc7aa36a620c177b1c87d43559cde
}

async function filterUsersBy(value) {
<<<<<<< HEAD
    try {

        var users = await httpService.get(endpoint)
        const regex = new RegExp(value, 'i')
        users = users.filter(user => regex.test(user.fullname) || regex.test(user.username))
        console.log('filtered users:', users);
        return users
    } catch (err) {
        console.log(err);
    }
}

function checkLoggedUser() {
    return sessionService.load(KEY)
}
=======
  try {
    var users = await httpService.get(endpoint);
    const regex = new RegExp(value, "i");
    users = users.filter(
      (user) => regex.test(user.fullname) || regex.test(user.username)
    );
    console.log("filtered users:", users);
    return users;
  } catch (err) {
    console.log(err);
  }
}
>>>>>>> 5f6dcb7cbc8fc7aa36a620c177b1c87d43559cde
