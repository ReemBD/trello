import { httpService } from './httpService'
import { sessionService } from './sessionStorageService'
const endpoint = 'user'
const KEY = 'loggedUserDB'

export const userService = {
    getUsers,
    login,
    signup,
    filterUsersBy,
    checkLoggedUser,
    logout
}

async function getUsers() {
    const users = await httpService.get(endpoint)
    return users
}

async function login(user) {
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
}


async function filterUsersBy(value) {
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

async function logout() {
    try {
        await httpService.post(`${endpoint}/logout`)
        sessionService.clear()
    } catch (err) {
        console.log('couldnt log out ', err);
    }

}