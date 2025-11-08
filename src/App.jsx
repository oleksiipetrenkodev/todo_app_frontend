import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "white",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <nav
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontSize: 20,
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: 1,
            }}
          >
            TodoFlow
          </Link>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Link
              to="/tasks"
              style={{
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                color: "#2563eb",
              }}
            >
              My tasks
            </Link>
            <Link
              to="/create-task"
              style={{
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                color: "white",
                backgroundColor: "#10b981",
                padding: "8px 14px",
                borderRadius: 999,
              }}
            >
              New task
            </Link>
          </div>
        </nav>
      </header>

      <main style={{ padding: "0 20px" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TasksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-task"
            element={
              <PrivateRoute>
                <CreateTaskPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
