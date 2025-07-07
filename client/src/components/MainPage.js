import React from "react";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2" fill="#b0b8c1"/><rect x="14" y="3" width="7" height="7" rx="2" fill="#b0b8c1"/><rect x="14" y="14" width="7" height="7" rx="2" fill="#b0b8c1"/><rect x="3" y="14" width="7" height="7" rx="2" fill="#b0b8c1"/></svg>
  ) },
  { key: "profile", label: "Profile", icon: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#b0b8c1"/><rect x="4" y="16" width="16" height="4" rx="2" fill="#b0b8c1"/></svg>
  ) },
  { key: "find", label: "Doctor", icon: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="8" fill="#b0b8c1"/><rect x="10" y="7" width="4" height="10" rx="2" fill="#fff"/><rect x="7" y="10" width="10" height="4" rx="2" fill="#fff"/></svg>
  ) },
  { key: "appointments", label: "Appointment", icon: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" fill="#b0b8c1"/><rect x="7" y="9" width="10" height="2" rx="1" fill="#fff"/><rect x="7" y="13" width="7" height="2" rx="1" fill="#fff"/></svg>
  ) }
];

const services = [
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="#2386c8"/><rect x="9" y="6" width="6" height="12" rx="3" fill="#fff"/><rect x="6" y="9" width="12" height="6" rx="3" fill="#fff"/></svg>
    ),
    title: "Specialist Doctors",
    desc: "Access to a wide range of specialist doctors across various medical fields."
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="8" fill="#ff7e33"/><rect x="10" y="7" width="4" height="10" rx="2" fill="#fff"/><rect x="7" y="10" width="10" height="4" rx="2" fill="#fff"/></svg>
    ),
    title: "Easy Booking",
    desc: "Book appointments 24/7 with our easy-to-use online scheduling system."
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4caf50"/><circle cx="12" cy="10" r="4" fill="#fff"/><rect x="7" y="16" width="10" height="2" rx="1" fill="#fff"/></svg>
    ),
    title: "Patient-Centric Care",
    desc: "We prioritize your health and comfort at every step of your journey."
  }
];

export default function MainPage({ user, onNav, onLogout }) {
  const [active, setActive] = React.useState("dashboard");

  const handleNav = key => {
    setActive(key);
    if (key !== "dashboard") onNav(key);
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "var(--background-light)", display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <section className="hero-fullwidth">
        <div className="hero-icon">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="#fff"/><rect x="9" y="6" width="6" height="12" rx="3" fill="#2a7fba"/><rect x="6" y="9" width="12" height="6" rx="3" fill="#2a7fba"/></svg>
        </div>
        <h1 className="hero-title">
          Welcome to <span className="hero-highlight">MediBook Pro</span>
        </h1>
        <div className="hero-quote">Your premium healthcare appointment platform</div>
        <div className="hero-btn-row">
          <button className="hero-btn-orange" onClick={() => onNav("find")}>FIND A DOCTOR</button>
          <button className="hero-btn-outline" onClick={() => onNav("appointments")}>MY APPOINTMENTS</button>
        </div>
      </section>
      {/* Services Section */}
      <section className="services-section">
        <h2 className="services-title">Our Services</h2>
        <div className="services-cards">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-icon">{s.icon}</div>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-quote">Ready to book your appointment? <span className="cta-highlight">Your health journey starts here!</span></div>
        <button className="cta-btn" onClick={() => onNav("find")}>Get Started</button>
      </section>
    </div>
  );
}