import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { Payload } from '../types/payload';
import { jwtDecode } from 'jwt-decode';

export default function SignRoute() {
    const [cookies] = useCookies(['auth']);

    const token = cookies.auth;

    if (!token) {
        return <Outlet />;
    }

    try {
        const user: Payload = jwtDecode(token);
        return user.role ? <Navigate to="/" /> : <Outlet />;
    } catch (error) {
        console.log(error);
        return <Outlet />;
    }
}
