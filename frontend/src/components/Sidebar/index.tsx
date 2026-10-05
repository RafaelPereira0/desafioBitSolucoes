import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  LogOut,
  Headset,
} from "lucide-react";
import "./styles.css";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth()

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Headset size={25} />
        </div>

        <div>
          <h2>Tickets System</h2>
          <span>Bit Soluções</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/tickets" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          <Ticket size={20} />
          <span>Tickets</span>
        </NavLink>

        <NavLink to="/new-ticket" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          <PlusCircle size={20} />
          <span>Novo Ticket</span>
        </NavLink>

        {user?.role === "ADMIN" && (
          <>
            <NavLink to="/new-category" className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }>
              <PlusCircle size={20} />
              <span>Nova Categoria</span>
            </NavLink>
          </>
        )}
      </nav>

      <button className="sidebar-logout" onClick={logout}>
        <LogOut size={20} />
        <span>Sair</span>
      </button>
    </aside>
  );
}

