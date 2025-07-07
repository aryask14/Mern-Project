import React, { useState } from "react";
import { apiFetch, setToken } from "../api";

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Register states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regAge, setRegAge] = useState("");
  const [regBlood, setRegBlood] = useState("");
  // Error and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setError("");
    if (!loginEmail || !loginPassword) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      setToken(res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setLoading(false);
      onAuth(res.user);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed");
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError("");
    if (!regName || !regEmail || !regPassword || !regConfirm || !regAge || !regBlood) {
      setError("Please fill all fields.");
      return;
    }
    if (regPassword !== regConfirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword, age: regAge, blood: regBlood })
      });
      setLoading(false);
      setIsLogin(true); // Go to login page after register
      setError("");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--background-light)"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        maxWidth: 420,
        width: "100%",
        padding: "40px 32px 32px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{ marginBottom: 18 }}>
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="6" fill="#2a7fba"/>
            <rect x="9" y="6" width="6" height="12" rx="3" fill="#fff"/>
            <rect x="6" y="9" width="12" height="6" rx="3" fill="#fff"/>
          </svg>
        </div>
        <div style={{
          fontWeight: 800,
          fontSize: 32,
          textAlign: "center",
          marginBottom: 4,
          lineHeight: 1.1
        }}>
          Welcome to <span style={{ color: "#2a7fba" }}>MediBook</span> <span style={{ color: "#ff7e33" }}>Pro</span>
        </div>
        <div style={{
          textAlign: "center",
          color: "#888",
          fontSize: 18,
          marginBottom: 24,
          marginTop: 4
        }}>
          Sign in to your account
        </div>
        {isLogin ? (
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{
                fontWeight: 500,
                color: "#444",
                display: "block",
                marginBottom: 4
              }}>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                style={{ width: "100%" }}
                autoComplete="username"
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{
                fontWeight: 500,
                color: "#444",
                display: "block",
                marginBottom: 4
              }}>Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                style={{ width: "100%" }}
                autoComplete="current-password"
              />
            </div>
            <button className="btn-primary" type="submit" style={{
              width: "100%",
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 10,
              padding: "12px 0",
              marginBottom: 8
            }} disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>
            {error && <div style={{ color: "var(--error-color)", marginTop: 10, textAlign: "center" }}>{error}</div>}
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ width: "100%" }}>
            <input
              className="form-control"
              type="text"
              placeholder="Full Name"
              value={regName}
              onChange={e => setRegName(e.target.value)}
              style={{ marginBottom: 14 }}
              autoComplete="name"
            />
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              style={{ marginBottom: 14 }}
              autoComplete="username"
            />
            <input
              className="form-control"
              type="number"
              placeholder="Age"
              value={regAge}
              onChange={e => setRegAge(e.target.value)}
              style={{ marginBottom: 14 }}
            />
            <input
              className="form-control"
              type="text"
              placeholder="Blood Group"
              value={regBlood}
              onChange={e => setRegBlood(e.target.value)}
              style={{ marginBottom: 14 }}
            />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
              style={{ marginBottom: 14 }}
              autoComplete="new-password"
            />
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              value={regConfirm}
              onChange={e => setRegConfirm(e.target.value)}
              style={{ marginBottom: 16 }}
              autoComplete="new-password"
            />
            <button className="btn-primary" type="submit" style={{ width: "100%" }} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            {error && <div style={{ color: "var(--error-color)", marginTop: 8 }}>{error}</div>}
          </form>
        )}
        <div className="text-center" style={{ marginTop: 18, fontSize: 15 }}>
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <a href="#" onClick={e => { e.preventDefault(); setIsLogin(false); setError(""); }} style={{ color: "#2a7fba", fontWeight: 600 }}>
                Register here
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="#" onClick={e => { e.preventDefault(); setIsLogin(true); setError(""); }} style={{ color: "#2a7fba", fontWeight: 600 }}>
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}