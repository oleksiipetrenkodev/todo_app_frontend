import { useState, useEffect } from "react";
import {
  Card,
  Header,
  CheckboxLabel,
  HiddenCheckbox,
  CheckboxBox,
  CheckIcon,
  Content,
  EditFields,
  TitleInput,
  DescriptionInput,
  TitleText,
  DescriptionText,
  Footer,
  Meta,
  EditActions,
  SaveButton,
  CancelButton,
  IconButton,
  EditIcon,
  ClockIcon,
} from "./TodoCard.styles";

export default function TodoCard({
  id,
  title,
  description,
  completed,
  createdAt,
  onToggle,
  onEdit,
  onDelete,
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

  const handleDelete = async () => {
    await onDelete(id);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description);
    setIsEditing(false);
  };

  return (
    <Card>
      <Header>
        <CheckboxLabel>
          <HiddenCheckbox
            type="checkbox"
            checked={completed}
            onChange={onToggle}
          />
          <CheckboxBox $completed={completed}>
            {completed && (
              <CheckIcon
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
              </CheckIcon>
            )}
          </CheckboxBox>
        </CheckboxLabel>
        <Content>
          {isEditing ? (
            <EditFields>
              <TitleInput
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
              />
              <DescriptionInput
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Task description"
                rows={3}
              />
            </EditFields>
          ) : (
            <>
              <TitleText $completed={completed}>{title}</TitleText>
              {description && (
                <DescriptionText $completed={completed}>
                  {description}
                </DescriptionText>
              )}
            </>
          )}
        </Content>
      </Header>
      <Footer>
        <Meta>
          <ClockIcon
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
          </ClockIcon>
          <span>{formatDate(createdAt)}</span>
        </Meta>
        {isEditing ? (
          <EditActions>
            <SaveButton
              onClick={handleSave}
              disabled={!editTitle.trim() || isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </SaveButton>
            <CancelButton onClick={handleCancel} disabled={isSaving}>
              Cancel
            </CancelButton>
          </EditActions>
        ) : (
          <IconButton onClick={() => setIsEditing(true)} title="Edit task">
            <EditIcon
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </EditIcon>
          </IconButton>
        )}
        <IconButton onClick={handleDelete} title="Delete task">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </IconButton>
      </Footer>
    </Card>
  );
}
