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
    let loggedUser;
    try {
        loggedUser = await httpService.post(`${endpoint}/login/?password=${user.password}&username=${user.username}`)
        console.log('logged', loggedUser);
    } catch (err) {
        console.log('couldnt find user');
    }
    return loggedUser
}

async function signup(user) {
    console.log('userrrr',user);
    try {
        await httpService.post(`${endpoint}/signup`, user)
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