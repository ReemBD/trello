import { HomePage } from './pages/HomePage.jsx'
import { Boards } from './pages/Boards.jsx'
import { TrelloApp } from './pages/TrelloApp.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

export const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/board/:boardId",
        component: TrelloApp
    },
    {
        path: "/board",
        component: Boards
    },

    {
        path: "/login",
        component: Login
    },
    {
        path: "/signup",
        component: Signup
    }
]