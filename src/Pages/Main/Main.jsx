import { Outlet } from "react-router"
import { Header } from "../../Components/Header"

export const Main = () => {
    return (<>
        <Header />
        <Outlet/>
    </>)
}