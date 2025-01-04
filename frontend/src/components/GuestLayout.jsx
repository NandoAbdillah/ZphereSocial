import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider"

export default function GuestLayout() {
    const {user, token } = useStateContext();

    if (token && user.role === 'user') {
        console.log(user.role);
        return <Navigate to="/" />
    }
    else if (token && user.role === 'admin')
    {
        return <Navigate to="/admin" />
    }

    return (
            
            <Outlet/>
    )
}