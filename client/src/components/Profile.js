import React, { useState, useEffect } from "react";
import { apiFetch } from "../api";

export default function Profile({ user, setUser, onBack }) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    age: user.age || "",
    blood: user.blood || "",
    password: "",
    newPassword: "",
    confirmNew: ""
  });
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  async function fetchProfile() {
    setLoading(true);
    setErr("");
    try {
      const data = await apiFetch("/auth/me");
      setForm(f => ({ ...f, ...data }));
      setUser(data);
    } catch (e) {
      setErr(e.message || "Failed to load profile");
    }
    setLoading(false);
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setErr(""); setMsg("");
    if (!form.name || !form.email) {
      setErr("Name and email are required.");
      return;
    }
    if (form.newPassword && form.newPassword !== form.confirmNew) {
      setErr("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const updated = await apiFetch("/auth/me", {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          age: form.age,
          blood: form.blood,
          password: form.password,
          newPassword: form.newPassword
        })
      });
      setUser(updated);
      setMsg("Profile updated!");
      setEdit(false);
    } catch (e) {
      setErr(e.message || "Update failed");
    }
    setLoading(false);
  };

  return (
    <div className="fade-in" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background-light)" }}>
      <div className="card shadow-md" style={{ maxWidth: 400, width: "100%", padding: 36 }}>
        <div className="brand-logo text-center" style={{ marginBottom: 24, fontSize: 28 }}>
          Profile
        </div>
        {loading ? (
          <div>Loading profile...</div>
        ) : !edit ? (
          <>
            <div style={{ marginBottom: 16 }}><b>Name:</b> {form.name}</div>
            <div style={{ marginBottom: 16 }}><b>Email:</b> {form.email}</div>
            <div style={{ marginBottom: 16 }}><b>Age:</b> {form.age || <span style={{ color: '#aaa' }}>Not set</span>}</div>
            <div style={{ marginBottom: 16 }}><b>Blood Group:</b> {form.blood || <span style={{ color: '#aaa' }}>Not set</span>}</div>
            <button className="btn-primary" style={{ width: "100%", marginBottom: 12 }} onClick={() => setEdit(true)}>Edit Profile</button>
            <button className="form-control" style={{ width: "100%" }} onClick={onBack}>Back to Dashboard</button>
            {msg && <div style={{ color: "var(--success-color)", marginTop: 10 }}>{msg}</div>}
            {err && <div style={{ color: "var(--error-color)", marginTop: 10 }}>{err}</div>}
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            <input className="form-control" name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} style={{ marginBottom: 12 }} />
            <input className="form-control" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ marginBottom: 12 }} />
            <input className="form-control" name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} style={{ marginBottom: 12 }} />
            <input className="form-control" name="blood" type="text" placeholder="Blood Group" value={form.blood} onChange={handleChange} style={{ marginBottom: 12 }} />
            <hr style={{ margin: '16px 0' }} />
            <input className="form-control" name="password" type="password" placeholder="Current Password (for update)" value={form.password} onChange={handleChange} style={{ marginBottom: 12 }} />
            <input className="form-control" name="newPassword" type="password" placeholder="New Password (optional)" value={form.newPassword} onChange={handleChange} style={{ marginBottom: 12 }} />
            <input className="form-control" name="confirmNew" type="password" placeholder="Confirm New Password" value={form.confirmNew} onChange={handleChange} style={{ marginBottom: 12 }} />
            <button className="btn-primary" type="submit" style={{ width: "100%", marginBottom: 10 }} disabled={loading}>{loading ? "Updating..." : "Update Profile"}</button>
            <button className="form-control" style={{ width: "100%" }} onClick={e => { e.preventDefault(); setEdit(false); setErr(""); }}>Cancel</button>
            {err && <div style={{ color: "var(--error-color)", marginTop: 10 }}>{err}</div>}
            {msg && <div style={{ color: "var(--success-color)", marginTop: 10 }}>{msg}</div>}
          </form>
        )}
      </div>
    </div>
  );
} 