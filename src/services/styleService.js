import { httpService } from "./httpService"


export const styleService = {

    getBgOptions,
}


async function getBgOptions() {
    const bgs = await httpService.get('background')
    return bgs
}
