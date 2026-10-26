
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { LayoutDashboard, MessageSquarePlus, GraduationCap } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import AddFeedback from "./pages/AddFeedback";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <GraduationCap size={27} />
        </div>
        <div>
          <h2>FeedSpace</h2>
          <span>ADMIN PANEL</span>
        </div>
      </div>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <LayoutDashboard size={19} />
          Dashboard
        </NavLink>

        <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <MessageSquarePlus size={19} />
          Add Feedback
        </NavLink>
      </div>

      <div className="admin-badge">
        <div className="admin-avatar">A</div>
        <div>
          <strong>Administrator</strong>
          <span>Course Manager</span>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddFeedback />} />
          </Routes>
        </main>

        <footer className="footer">
          © 2026 FeedSpace · Course Feedback Management
        </footer>
      </div>
    </BrowserRouter>
  );
}