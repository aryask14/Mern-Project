import React, { useState } from "react";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2" fill="#6ea8e6"/><rect x="14" y="3" width="7" height="7" rx="2" fill="#6ea8e6"/><rect x="14" y="14" width="7" height="7" rx="2" fill="#6ea8e6"/><rect x="3" y="14" width="7" height="7" rx="2" fill="#6ea8e6"/></svg>
  ) },
  { key: "profile", label: "Profile", icon: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#6ea8e6"/><rect x="4" y="16" width="16" height="4" rx="2" fill="#6ea8e6"/></svg>
  ) },
  { key: "find", label: "Doctors", icon: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="8" fill="#6ea8e6"/><rect x="10" y="7" width="4" height="10" rx="2" fill="#fff"/><rect x="7" y="10" width="10" height="4" rx="2" fill="#fff"/></svg>
  ) },
  { key: "appointments", label: "Appointments", icon: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" fill="#6ea8e6"/><rect x="7" y="9" width="10" height="2" rx="1" fill="#fff"/><rect x="7" y="13" width="7" height="2" rx="1" fill="#fff"/></svg>
  ) }
];

export default function Layout({ user, onLogout, active, onNav, children }) {
  const [expanded, setExpanded] = useState(true);
  const sidebarWidth = expanded ? 240 : 70;

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%", background: "var(--background-light)", overflowX: "hidden" }}>
      {/* Sidebar */}
      <aside
        className={`sidebar-dashboard-perfect${expanded ? " expanded" : " collapsed"}`}
        style={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          transition: "width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s cubic-bezier(.4,0,.2,1)",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 20
        }}
      >
        <div className="sidebar-logo-block-perfect">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="#fff"/><rect x="9" y="6" width="6" height="12" rx="3" fill="#2a7fba"/><rect x="6" y="9" width="12" height="6" rx="3" fill="#2a7fba"/></svg>
          {expanded && <span className="sidebar-logo-title-perfect">MediBook <span style={{ color: '#ff7e33' }}>Pro</span></span>}
          <button className="sidebar-chevron-btn-perfect" onClick={() => setExpanded(e => !e)}>
            {expanded ? (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#2a7fba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </button>
        </div>
        <nav className="sidebar-nav-perfect">
          {navItems.map(item => (
            <div
              key={item.key}
              className={`sidebar-link-perfect${active === item.key ? " active" : ""}`}
              onClick={() => onNav(item.key)}
              title={item.label}
            >
              <span className="sidebar-link-perfect-icon">{item.icon}</span>
              {expanded && <span className="sidebar-link-perfect-label">{item.label}</span>}
            </div>
          ))}
        </nav>
      </aside>
      {/* Main Content Area */}
      <div
        className={`layout-main-fixed${expanded ? " expanded" : " collapsed"}`}
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: "margin-left 0.22s cubic-bezier(.4,0,.2,1), width 0.22s cubic-bezier(.4,0,.2,1)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Top Bar */}
        <header className="main-topbar-fixed" style={{
          marginLeft: 0,
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0
        }}>
          <div style={{
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="#2a7fba"/><rect x="9" y="6" width="6" height="12" rx="3" fill="#fff"/><rect x="6" y="9" width="12" height="6" rx="3" fill="#fff"/></svg>
              <span className="main-topbar-title">MediBook <span style={{ color: '#ff7e33' }}>Pro</span></span>
            </div>
            <div className="main-topbar-fixed-right">
              <div className="profile-circle2">{user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}</div>
              <button className="main-logout-btn2" onClick={onLogout}>LOGOUT</button>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column" }}>
          {children}
        </main>
      </div>
    </div>
  );
} 