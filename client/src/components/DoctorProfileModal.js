import React, { useState } from "react";

export default function DoctorProfileModal({ doctor, onBook, onClose }) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div className="card" style={{ maxWidth: 420, width: "100%", padding: 32, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>&times;</button>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
          <img src={doctor.image} alt={doctor.name} style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: "3px solid #2a7fba" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{doctor.name}</div>
            <div style={{ margin: "6px 0" }}>
              <span className="doctor-card-specialty-chip">{doctor.specialty}</span>
            </div>
            <div style={{ color: "#444", fontSize: 15 }}>{doctor.hospital}</div>
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <span style={{ color: "#ff7e33", fontWeight: 600, fontSize: 17 }}>★ {doctor.rating}</span>
          <span style={{ color: "#888", fontSize: 15 }}> ({doctor.reviews} reviews)</span>
        </div>
        <div style={{ marginBottom: 18, color: '#26344a', fontSize: 15 }}>
          {/* Example bio, you can customize or add more fields */}
          {doctor.name} is a renowned specialist in {doctor.specialty} at {doctor.hospital}. With a patient rating of {doctor.rating} and {doctor.reviews} reviews, {doctor.name.split(' ')[1] || doctor.name} is dedicated to providing excellent care.
        </div>
        <button className="btn-primary" style={{ width: "100%" }} onClick={onBook}>Book Appointment</button>
      </div>
    </div>
  );
} 