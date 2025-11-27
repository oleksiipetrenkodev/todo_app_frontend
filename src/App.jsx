import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";

export default function App() {
  return (
    <>
      <header className="app-header">
        <nav className="app-nav">
          <Link to="/" className="app-brand">
            TodoFlow
          </Link>
          <div className="app-links">
            <Link to="/tasks" className="app-link">
              My tasks
            </Link>
            <Link to="/create-task" className="app-new-task">
              New task
            </Link>
          </div>
        </nav>
      </header>

      <main className="app-main">
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
