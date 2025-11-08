import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getToken, login } from "../api/auth";

export default function LoginPage() {
  const nav = useNavigate();
  const token = getToken();
  const [email, setEmail] = useState("oleksii@example.com");
  const [password, setPassword] = useState("oleksii");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      nav("/tasks", { replace: true });
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  if (token) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <div style={{ maxWidth: 360, margin: "10vh auto" }}>
      <h1>Sign in</h1>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          style={{ padding: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          style={{ padding: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            background: "#2563eb",
            color: "white",
            fontWeight: 600,
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}
    </div>
  );
}
