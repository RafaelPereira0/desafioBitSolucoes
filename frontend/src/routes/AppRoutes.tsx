import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import Layout from "../layouts";
import Tickets from "../pages/Tikcets";
import CreateTicket from "../pages/NewTicket";
import CreateCategories from "../pages/NewCategory";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<PrivateRoutes />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/tickets" element={<Tickets />} />
                        <Route path="/new-ticket" element={<CreateTicket />} />
                    </Route>
                </Route>
                <Route element={<PrivateRoutes allowedRoules="ADMIN" />}>
                    <Route element={<Layout />}>
                        <Route path="new-category" element={<CreateCategories />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}