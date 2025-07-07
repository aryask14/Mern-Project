import React from "react";

export default function DoctorCard({ doctor, booked, onProfile }) {
  return (
    <div className="doctor-card-modern">
      <div className="doctor-card-img-wrap">
        <img src={doctor.image} alt={doctor.name} className="doctor-card-img" />
      </div>
      <div className="doctor-card-content">
        <div className="doctor-card-name">{doctor.name}</div>
        <div className="doctor-card-specialty-chip">{doctor.specialty}</div>
        <div className="doctor-card-hospital">{doctor.hospital}</div>
        <div className="doctor-card-rating">
          <span className="doctor-card-star">★</span> {doctor.rating} <span className="doctor-card-reviews">({doctor.reviews} reviews)</span>
        </div>
        <button
          className="doctor-card-book-btn"
          onClick={onProfile}
          disabled={booked}
        >
          {booked ? "Already Booked" : "View Profile & Book"}
        </button>
      </div>
    </div>
  );
}