import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../api/auth";

export default function HomePage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(getToken())
  );

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(Boolean(getToken()));
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    clearToken();
    setIsAuthenticated(false);
  };

  const buttonStyle = {
    padding: "12px 18px",
    borderRadius: 999,
    border: "none",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    minWidth: 120,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 24,
      }}
    >
      <div>
        <p style={{ textTransform: "uppercase", letterSpacing: 4, margin: 0 }}>
          Welcome to
        </p>
        <h1 style={{ fontSize: 48, margin: 8 }}>Your Todo Workspace</h1>
        <p style={{ color: "#475569", maxWidth: 420, margin: "0 auto" }}>
          Jump in to manage your tasks. Sign in to access private routes, or
          sign out when you are done.
        </p>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        {!isAuthenticated && (
          <button
            type="button"
            onClick={handleLogin}
            style={{
              ...buttonStyle,
              backgroundColor: "#2563eb",
              color: "white",
            }}
          >
            Login
          </button>
        )}
        {isAuthenticated && (
          <button
            type="button"
            onClick={handleLogout}
            style={{
              ...buttonStyle,
              backgroundColor: "#f1f5f9",
              color: "#0f172a",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
