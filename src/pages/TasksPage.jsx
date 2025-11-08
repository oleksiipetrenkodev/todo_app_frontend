import { useEffect, useState } from "react";
import client from "../api/client";
import TodoCard from "../components/TodoCard";

export default function TasksPage() {
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!tasks) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "6vh auto" }}>
      <h1>My Tasks</h1>
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
