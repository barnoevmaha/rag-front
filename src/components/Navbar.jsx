import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/upload", label: "Upload" },
  { to: "/documents", label: "Documents" },
  { to: "/chat", label: "Chat" },
  { to: "/settings", label: "Settings" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">RAG Document Chat</span>
      <div className="navbar-links">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => "navbar-link" + (isActive ? " navbar-link-active" : "")}
            end={link.to === "/"}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
