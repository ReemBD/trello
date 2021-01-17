import userEvent from '@testing-library/user-event'
import { httpService } from './httpService'
const endpoint = 'user'

export const userService = {
    getUsers,
    login,
    signup,
    filterUsersBy

}

async function getUsers() {
    const users = await httpService.get(endpoint)
    return users
}

async function login(user) {
    console.log(user);
    let loggedUser;
    try {
        loggedUser = await httpService.get(`${endpoint}/?password=${user.password}&email=${user.email}}`)
        console.log('logged', loggedUser);
    } catch (err) {
        console.log('couldnt find user');
    }
    return loggedUser

}

async function signup(user) {
    try {
        await httpService.post(endpoint, user)
        return user
    } catch (err) {
        console.log('problem signing in ', err);
    }
}


async function filterUsersBy(value) {
    try {

        var users = await httpService.get(endpoint)
        const regex = new RegExp(value, 'i')
        users = users.filter(user => regex.test(user.fullname) || regex.test(user.email))
        console.log('filtered users:', users);
        return users
    } catch (err) {
        console.log(err);
    }
}