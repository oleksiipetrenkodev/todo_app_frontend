import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTask = async (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim() || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        completed,
      };
      await client.post("/create-task", payload);
      setTitle("");
      setDescription("");
      setCompleted(false);
      navigate("/tasks");
    } catch (err) {
      setSubmitError("Failed to save task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const disableSave = !title.trim() || !description.trim() || isSubmitting;

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "10vh auto",
        padding: 24,
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      <h1 style={{ marginBottom: 24 }}>Create a new task</h1>
      <form
        onSubmit={handleCreateTask}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontWeight: 600 }}>Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a task title"
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 16,
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontWeight: 600 }}>Description</span>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a short description"
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontFamily: "inherit",
              fontSize: 16,
              resize: "vertical",
            }}
          />
        </label>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontWeight: 600,
          }}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Mark as completed
        </label>

        {submitError ? (
          <p style={{ color: "crimson", marginTop: -4 }}>{submitError}</p>
        ) : null}

        <button
          type="submit"
          disabled={disableSave}
          style={{
            marginTop: 8,
            padding: "12px 16px",
            borderRadius: 8,
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            color: "white",
            backgroundColor: disableSave ? "#94a3b8" : "#2563eb",
            cursor: disableSave ? "not-allowed" : "pointer",
            transition: "background-color 0.15s ease",
          }}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
