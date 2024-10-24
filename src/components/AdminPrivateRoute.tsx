import { jwtDecode } from "jwt-decode"
import { useCookies } from "react-cookie"
import { Navigate, Outlet } from "react-router-dom"
import { Payload } from "../types/payload"

export default function AdminPrivateRoute() {
    const [cookies] = useCookies(["auth"])

    const token = cookies.auth

    if (!token) {
        return <Navigate to="/login" />
    }

    try {
        const user: Payload = jwtDecode(token)
        return user.role === "SUPER_ADMIN" ? (
            <Outlet />
        ) : (
            <Navigate to="/login" />
        )
    } catch (error) {
        console.log(error)
        return <Navigate to="/login" />
    }
}
