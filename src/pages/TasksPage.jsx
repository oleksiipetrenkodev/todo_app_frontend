import { useEffect, useState } from "react";
import client from "../api/client";
import TodoCard from "../components/TodoCard";

export default function TasksPage() {
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    status: "all",
  });

  useEffect(() => {
    let mounted = true;
    client
      .get("/tasks")
      .then(({ data }) => {
        if (mounted) setTasks(data);
      })
      .catch(() => {
        if (mounted) setError("Failed to load tasks");
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleToggleCompleted = async (taskId, currentCompleted) => {
    try {
      const { data: updatedTask } = await client.put(`/edit-task/${taskId}`, {
        completed: !currentCompleted,
      });

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const handleEditTask = async (taskId, updates) => {
    try {
      const { data: updatedTask } = await client.put(
        `/edit-task/${taskId}`,
        updates
      );

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch (err) {
      setError("Failed to update task");
      throw err;
    }
  };

  const handleTitleFilterChange = (event) => {
    console.log("handleTitleFilterChange");
    setFilters((prev) => ({ ...prev, title: event.target.value }));
  };

  const handleDateFilterChange = (event) => {
    console.log("handleDateFilterChange");
    setFilters((prev) => ({ ...prev, date: event.target.value }));
  };

  const handleStatusFilterChange = (event) => {
    console.log("handleStatusFilterChange");
    setFilters((prev) => ({ ...prev, status: event.target.value }));
  };

  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!tasks) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "6vh auto" }}>
      <h1>My Tasks</h1>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginTop: 24,
          padding: 16,
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          background: "#f8fafc",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 14, color: "#475569" }}>Title</span>
          <input
            type="text"
            placeholder="Search by title"
            value={filters.title}
            onChange={handleTitleFilterChange}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              fontSize: 14,
            }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 14, color: "#475569" }}>Date</span>
          <input
            type="date"
            value={filters.date}
            onChange={handleDateFilterChange}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              fontSize: 14,
            }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 14, color: "#475569" }}>Status</span>
          <select
            value={filters.status}
            onChange={handleStatusFilterChange}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              fontSize: 14,
              background: "white",
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
          </select>
        </label>
      </section>
      {tasks.length === 0 ? (
        <p style={{ color: "#64748b", marginTop: 16 }}>
          No tasks yet. Create your first task!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {tasks.map((t) => (
            <TodoCard
              key={t.id}
              id={t.id}
              title={t.title}
              description={t.description}
              completed={t.completed}
              createdAt={t.createdAt}
              onToggle={() => handleToggleCompleted(t.id, t.completed)}
              onEdit={(updates) => handleEditTask(t.id, updates)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
