import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";
import DoctorCard from "./DoctorCard";
import BookingModal from "./BookingModal";
import DoctorProfileModal from "./DoctorProfileModal";

export default function FindDoctors({ bookings, user, onBook }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      setError("");
      try {
        let url = "/doctors";
        if (specialty) url += `?specialty=${encodeURIComponent(specialty)}`;
        const data = await apiFetch(url);
        setDoctors(data);
      } catch (err) {
        setError(err.message || "Failed to load doctors");
      }
      setLoading(false);
    }
    fetchDoctors();
  }, [specialty]);

  const specialties = Array.from(new Set(doctors.map(d => d.specialty)));

  const filtered = doctors.filter(d =>
    (!search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()))
  );

  function handleProfile(doctor) {
    setSelectedDoctor(doctor);
    setShowProfile(true);
  }

  function handleBookFromProfile() {
    setShowProfile(false);
    setShowBooking(true);
  }

  function handleBook(appt) {
    setShowBooking(false);
    if (onBook) onBook(appt);
  }

  return (
    <div className="find-doctors-page">
      <div className="find-doctors-title">Find a Doctor</div>
      <div className="find-doctors-searchbar-row">
        <input
          className="find-doctors-searchbar"
          placeholder="Search doctors by name or specialty..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="find-doctors-chips-row">
        <button
          className={`find-doctors-chip${!specialty ? " active" : ""}`}
          onClick={() => setSpecialty("")}
        >
          All Specialties
        </button>
        {specialties.map(s => (
          <button
            key={s}
            className={`find-doctors-chip${specialty === s ? " active" : ""}`}
            onClick={() => setSpecialty(s)}
          >
            {s}
          </button>
        ))}
      </div>
      {loading ? (
        <div>Loading doctors...</div>
      ) : error ? (
        <div style={{ color: "var(--error-color)", margin: 24 }}>{error}</div>
      ) : (
        <div className="find-doctors-cards-grid">
          {filtered.length === 0 ? (
            <div className="find-doctors-empty">No doctors found.</div>
          ) : (
            filtered.map(doc => (
              <DoctorCard
                key={doc._id}
                doctor={doc}
                booked={bookings.some(b => b.doctorId === doc._id && b.status !== "cancelled")}
                onProfile={() => handleProfile(doc)}
              />
            ))
          )}
        </div>
      )}
      {showProfile && selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          onBook={handleBookFromProfile}
          onClose={() => setShowProfile(false)}
        />
      )}
      {showBooking && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          user={user}
          onBook={handleBook}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}
