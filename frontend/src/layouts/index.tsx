import { Outlet } from "react-router-dom"
import './styles.css'
import Sidebar from "../components/Sidebar"

export default function Layout(){
    return(
        <div className="container">
            <Sidebar/>
            <main className="main">
                <div className="content">
                    <Outlet/>
                </div>
            </main>
        </div>
    )
}