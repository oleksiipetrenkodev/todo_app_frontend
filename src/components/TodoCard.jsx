import { useState, useEffect } from "react";

export default function TodoCard({
  id,
  title,
  description,
  completed,
  createdAt,
  onToggle,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setEditTitle(title);
      setEditDescription(description);
    }
  }, [title, description, isEditing]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSave = async () => {
    if (!editTitle.trim() || isSaving) return;
    setIsSaving(true);
    try {
      const updates = {
        title: editTitle.trim(),
        description: editDescription.trim(),
      };
      await onEdit(updates);
      setIsEditing(false);
    } catch (err) {
      // Error is handled by parent component
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <label
          style={{
            position: "relative",
            display: "inline-block",
            cursor: "pointer",
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggle}
            style={{
              position: "absolute",
              opacity: 0,
              cursor: "pointer",
              width: 0,
              height: 0,
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 24,
              height: 24,
              border: "2px solid #d1d5db",
              borderRadius: 6,
              backgroundColor: completed ? "#10b981" : "#ffffff",
              transition: "all 0.2s",
              position: "relative",
            }}
          >
            {completed && (
              <svg
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 16,
                  height: 16,
                  color: "#ffffff",
                }}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </span>
        </label>
        <div style={{ flex: 1, minWidth: 0 }}>
          {isEditing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Task description"
                rows={3}
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>
          ) : (
            <>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: completed ? "#6b7280" : "#111827",
                  textDecoration: completed ? "line-through" : "none",
                  marginBottom: 4,
                }}
              >
                {title}
              </div>
              {description && (
                <div
                  style={{
                    fontSize: 14,
                    color: completed ? "#9ca3af" : "#4b5563",
                    lineHeight: 1.5,
                    textDecoration: completed ? "line-through" : "none",
                  }}
                >
                  {description}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 8,
          borderTop: "1px solid #f3f4f6",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "#9ca3af",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{formatDate(createdAt)}</span>
        </div>
        {isEditing ? (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <button
              onClick={handleSave}
              disabled={!editTitle.trim() || isSaving}
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                border: "none",
                fontSize: 12,
                fontWeight: 600,
                color: "white",
                backgroundColor:
                  !editTitle.trim() || isSaving ? "#94a3b8" : "#10b981",
                cursor:
                  !editTitle.trim() || isSaving ? "not-allowed" : "pointer",
                transition: "background-color 0.15s",
              }}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                border: "1px solid #d1d5db",
                fontSize: 12,
                fontWeight: 600,
                color: "#6b7280",
                backgroundColor: "#ffffff",
                cursor: isSaving ? "not-allowed" : "pointer",
                transition: "background-color 0.15s",
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: 6,
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            title="Edit task"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#9ca3af" }}
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
