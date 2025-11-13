import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import {
  CheckboxLabel,
  Container,
  ErrorText,
  FieldCaption,
  FieldLabel,
  Form,
  SubmitButton,
  TextArea,
  TextInput,
  Title,
} from "./CreateTaskPage.styles";

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
    <Container>
      <Title>Create a new task</Title>
      <Form onSubmit={handleCreateTask}>
        <FieldLabel>
          <FieldCaption>Title</FieldCaption>
          <TextInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a task title"
          />
        </FieldLabel>

        <FieldLabel>
          <FieldCaption>Description</FieldCaption>
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a short description"
          />
        </FieldLabel>

        <CheckboxLabel>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Mark as completed
        </CheckboxLabel>

        {submitError ? (
          <ErrorText>{submitError}</ErrorText>
        ) : null}

        <SubmitButton type="submit" disabled={disableSave}>
          {isSubmitting ? "Saving..." : "Save"}
        </SubmitButton>
      </Form>
    </Container>
  );
}
