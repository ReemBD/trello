import { httpService } from "./httpService"


export const styleService = {

    getBgOptions,
}


async function getBgOptions() {

    return  [
        "linear-gradient(to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)",
        "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
        "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
        "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)",
        "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
        "linear-gradient(to top, #30cfd0 0%, #330867 100%)"
    ]
}