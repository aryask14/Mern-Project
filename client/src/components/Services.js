import React from "react";

const services = [
  { name: "General Consultation", desc: "Routine checkups and health advice." },
  { name: "Specialist Referral", desc: "Get referred to top specialists." },
  { name: "Lab Tests", desc: "Blood tests, X-rays, and more." },
  { name: "Vaccinations", desc: "Stay up to date with immunizations." }
];

export default function Services({ onBack }) {
  return (
    <div className="fade-in" style={{ padding: 32 }}>
      <button className="btn-primary" onClick={onBack} style={{ marginBottom: 24 }}>← Back</button>
      <h2 className="brand-gradient-text text-center">Our Services</h2>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
        {services.map((s, idx) => (
          <div className="card shadow-md" style={{ width: 260 }} key={idx}>
            <div style={{ padding: 16 }}>
              <h4>{s.name}</h4>
              <p style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}