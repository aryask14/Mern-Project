import React, { useState } from "react";
import { apiFetch } from "../api";

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

export default function BookingModal({ doctor, user, onBook, onClose }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (!date || !time) {
      setError("Please select date and time.");
      return;
    }
    setLoading(true);
    try {
      const datetime = new Date(`${date}T${time}`);
      const appt = await apiFetch("/appointments", {
        method: "POST",
        body: JSON.stringify({ doctorId: doctor._id, datetime })
      });
      setLoading(false);
      setSuccessMsg(`Appointment booked with ${doctor.name} on ${date} at ${time}.`);
      setTimeout(() => {
        onBook(appt);
        onClose();
      }, 2000);
    } catch (err) {
      setLoading(false);
      if (err.message && err.message.includes("already booked")) {
        setError("This time slot is already booked by another user.");
      } else {
        setError(err.message || "Booking failed");
      }
    }
  };

  return (
    <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div className="card" style={{ maxWidth: 400, width: "100%", padding: 32, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>&times;</button>
        <h3 style={{ marginBottom: 18 }}>Book Appointment</h3>
        <div style={{ marginBottom: 10 }}><b>Doctor:</b> {doctor.name}</div>
        {successMsg ? (
          <div style={{ color: "var(--success-color)", marginTop: 10, textAlign: "center" }}>
            {successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="date"
              value={date}
              onChange={e => { setDate(e.target.value); setTime(""); }}
              style={{ marginBottom: 12 }}
            />
            <select
              className="form-control"
              value={time}
              onChange={e => setTime(e.target.value)}
              style={{ marginBottom: 12 }}
              disabled={!date}
            >
              <option value="">Select time slot</option>
              {TIME_SLOTS.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            <button className="btn-primary" type="submit" style={{ width: "100%" }} disabled={loading}>
              {loading ? "Booking..." : "Book Appointment"}
            </button>
            {error && <div style={{ color: "var(--error-color)", marginTop: 10 }}>{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}