import { LOGIN_ROUTE, MAIN_ROUTE, MESSAGES_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, USERS_ROUTE } from "./consts"
import Auth from "./pages/Auth"
import Main from "./pages/Main"
import Messages from "./pages/Messages"
import Profile from "./pages/Profile"
import UserProfile from "./pages/UserProfile"
import Users from "./pages/Users"

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTER_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    }
]


export const adminRoutes = [
    {
        
    }
]


export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: USERS_ROUTE,
        Component: Users
    },
    {
        path: USERS_ROUTE + '/:id',
        Component: UserProfile
    },
    {
        path: MESSAGES_ROUTE + '/:id',
        Component: Messages
    }
]