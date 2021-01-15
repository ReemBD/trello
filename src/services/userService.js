import { httpService } from './httpService'
const endpoint = 'user'

export const userService = {
    getUsers,
    login,
    signup,


}

async function getUsers() {
    const users = await httpService.get(endpoint)
    return users
}

async function login(user) {
    console.log(user);
    try {
        var loggedUser = await httpService.get(`${endpoint}/?password=${user.password}&email=${user.email}}`)
    } catch (err) {
        console.log('couldnt find user');
    }
    console.log('logged', loggedUser);
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
    const users = await getUsers()
    const regex = new Regex
    // return users.map


}