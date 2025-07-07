import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import FindDoctors from "./components/FindDoctors";
import Appointments from "./components/Appointments";
import Profile from "./components/Profile";
import AuthPage from "./components/AuthPage";

function App() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState("dashboard");

  // Load bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bookings");
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  // Save bookings to localStorage
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleBook = booking =>
    setBookings([...bookings, { ...booking, id: Date.now() }]);

  const handleCancel = id => {
    setBookings(bookings =>
      bookings.map(b =>
        b.id === id ? { ...b, status: "cancelled" } : b
      )
    );
  };

  const handleUpdateTime = (id, newTime) => {
    setBookings(bookings =>
      bookings.map(b =>
        b.id === id ? { ...b, time: newTime } : b
      )
    );
  };

  const handleLogout = () => { setUser(null); setPage("dashboard"); };

  if (!user)
    return <AuthPage onAuth={u => { setUser(u); setPage("dashboard"); }} />;

  return (
    <Layout
      user={user}
      onLogout={handleLogout}
      active={page}
      onNav={setPage}
    >
      {page === "dashboard" && <MainPage user={user} onNav={setPage} onLogout={handleLogout} />}
      {page === "find" && (
        <FindDoctors
          bookings={bookings}
          user={user}
          onBook={handleBook}
        />
      )}
      {page === "appointments" && (
        <Appointments
          bookings={bookings}
          user={user}
          onCancel={handleCancel}
          onUpdateTime={handleUpdateTime}
          onNav={setPage}
        />
      )}
      {page === "profile" && (
        <Profile user={user} setUser={setUser} onBack={() => setPage("dashboard")} />
      )}
    </Layout>
  );
}

export default App;