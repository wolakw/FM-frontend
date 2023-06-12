import {Navigate, Outlet} from "react-router";

function UserOutlet() {
    const token = localStorage.getItem("token");
    return token ? <Outlet/> : <Navigate to="/login"/>;
}

export default UserOutlet;