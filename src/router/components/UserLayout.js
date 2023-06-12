import Navbar from "../../layout/Navbar";

const UserLayout = ({children})=>{
    return (
        <>
        <Navbar/>
            {children}
        </>
    )
}
export default UserLayout;