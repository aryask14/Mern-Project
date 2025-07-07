import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";
import doctors from "../data/doctors";

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

function isPast(dateStr, timeStr) {
  // For demo: always return false unless you store real dates
  // Replace with real date logic if you store appointment dates
  return false;
}

export default function Appointments({ user, onNav }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  async function fetchAppointments() {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/appointments/my");
      setAppointments(data);
    } catch (err) {
      setError(err.message || "Failed to load appointments");
    }
    setLoading(false);
  }

  async function handleCancel(id) {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      await apiFetch(`/appointments/${id}`, { method: "DELETE" });
      setAppointments(appts => appts.map(a => a._id === id ? { ...a, status: "cancelled" } : a));
    } catch (err) {
      alert(err.message || "Cancel failed");
    }
  }

  async function handleUpdate(id, appt) {
    if (!newDate || !newTime) return alert("Select new date and time");
    setUpdatingId(id);
    try {
      const datetime = new Date(`${newDate}T${newTime}`);
      const updated = await apiFetch(`/appointments/${id}`, {
        method: "PUT",
        body: JSON.stringify({ datetime })
      });
      setAppointments(appts => appts.map(a => a._id === id ? updated : a));
      setUpdatingId(null);
      setNewDate("");
      setNewTime("");
    } catch (err) {
      alert(err.message || "Update failed");
      setUpdatingId(null);
    }
  }

  const now = new Date();

  return (
    <div className="appointments-page">
      <div className="appointments-title">My Appointments</div>
      {loading ? (
        <div>Loading appointments...</div>
      ) : error ? (
        <div style={{ color: "var(--error-color)", margin: 24 }}>{error}</div>
      ) : appointments.length === 0 ? (
        <div className="appointments-empty">
          <div className="appointments-empty-quote">No appointments found.</div>
          <button className="appointments-book-btn" onClick={() => onNav("find")}>Book Now</button>
        </div>
      ) : (
        <div className="appointments-table-wrap">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appt => {
                const isPast = new Date(appt.datetime) < now;
                const currentDate = new Date(appt.datetime).toISOString().slice(0, 10);
                const currentTime = new Date(appt.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                return (
                  <tr key={appt._id} className={appt.status === "cancelled" ? "appointments-row-cancelled" : ""}>
                    <td>{appt.doctor?.name || appt.doctorName || "-"}</td>
                    <td>{appt.doctor?.specialty || "-"}</td>
                    <td>
                      {updatingId === appt._id ? (
                        <>
                          {newDate || newTime
                            ? `${newDate || '---- -- --'} ${newTime || '----'}`
                            : new Date(appt.datetime).toLocaleString()}
                        </>
                      ) : (
                        new Date(appt.datetime).toLocaleString()
                      )}
                    </td>
                    <td>
                      <span className={`appointments-status ${appt.status}`}>{isPast ? "Completed" : appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}</span>
                    </td>
                    <td>
                      {appt.status !== "cancelled" && !isPast && (
                        <>
                          <button className="appointments-cancel-btn" onClick={() => handleCancel(appt._id)}>Cancel</button>
                          <div style={{ marginTop: 8 }}>
                            <input
                              type="date"
                              value={updatingId === appt._id ? newDate : ""}
                              onChange={e => setNewDate(e.target.value)}
                              style={{ marginRight: 4 }}
                            />
                            <select
                              value={updatingId === appt._id ? newTime : ""}
                              onChange={e => setNewTime(e.target.value)}
                              style={{ marginRight: 4 }}
                            >
                              <option value="">Select time slot</option>
                              {TIME_SLOTS.map(slot => (
                                <option
                                  key={slot}
                                  value={slot}
                                  style={
                                    slot === currentTime ? { background: '#4caf50', color: '#fff' } : {}
                                  }
                                >
                                  {slot}
                                </option>
                              ))}
                            </select>
                            <button
                              className="btn-primary"
                              style={{ padding: "4px 12px", fontSize: 13 }}
                              disabled={updatingId === appt._id && (!newDate || !newTime)}
                              onClick={() => handleUpdate(appt._id, appt)}
                            >
                              {updatingId === appt._id ? "Save" : "Update"}
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}