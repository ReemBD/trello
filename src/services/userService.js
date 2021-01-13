import { httpService } from './httpService'
const endpoint = 'user'

export const userService = {
    getUsers
}


async function getUsers() {
    const users = await httpService.get(endpoint)
    return users
}