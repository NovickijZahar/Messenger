import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "./consts"
import Auth from "./pages/Auth"
import Main from "./pages/Main"
import Profile from "./pages/Profile"

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
    }
]