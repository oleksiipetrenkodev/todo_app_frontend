import { useEffect, useState } from "react";
import client from "../api/client";
import TodoCard from "../components/TodoCard";
import {
  Container,
  EmptyState,
  ErrorMessage,
  FilterCaption,
  FilterInput,
  FilterLabel,
  FilterSelect,
  FiltersSection,
  Heading,
  LoadingMessage,
  TasksGrid,
} from "./TasksPage.styles";

export default function TasksPage() {
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    status: "all",
  });

  const [previewUrls, setPreviewUrls] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchFiltered = async () => {
      try {
        const trimmedTitle = filters.title.trim();

        const effectiveFilters = {
          ...filters,
          title: trimmedTitle,
        };

        if (trimmedTitle && trimmedTitle.length < 3)
          effectiveFilters.title = "";

        const cleanFilters = Object.fromEntries(
          Object.entries(effectiveFilters).filter(
            ([_, v]) => v !== "" && v !== "all"
          )
        );

        const params = new URLSearchParams(cleanFilters);
        window.history.replaceState(null, "", `?${params.toString()}`);

        const { data } = await client.get("/tasks", {
          params: effectiveFilters,
          signal: controller.signal,
        });

        setTasks(data);
      } catch (err) {
        const canceled =
          err?.code === "ERR_CANCELED" || err?.name === "AbortError";
        if (!canceled) setError("Failed to load tasks");
      }
    };

    fetchFiltered();
    return () => controller.abort();
  }, [filters]);

  const uploadAttachment = async (taskId, file) => {
    try {
      const form = new FormData();
      form.append("file", file);

      const { data: updatedTask } = await client.post(
        `/tasks/${taskId}/attachments`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (err) {
      const status = err?.response?.status;
      if (status === 413) setError("File is too large");
      else if (status === 400) setError("Unsupported file type");
      else setError("Failed to upload file");
    }
  };

  const deleteAttachment = async (taskId, key) => {
    try {
      const { data: updatedTask } = await client.delete(
        `/tasks/${taskId}/attachments`,
        { params: { key } }
      );

      setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (err) {
      setError("Failed to delete image");
    }
  };

  const getPreviewUrl = async (taskId, key) => {
    const cacheKey = `${taskId}:${key}`;
    if (previewUrls[cacheKey]) return previewUrls[cacheKey];

    const { data } = await client.get(
      `/tasks/${taskId}/attachments/presign-get`,
      {
        params: { key },
      }
    );

    setPreviewUrls((prev) => ({ ...prev, [cacheKey]: data.url }));

    return data.url;
  };

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

  const handleDeleteTask = async (taskId) => {
    try {
      await client.delete(`/delete-task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const handleTitleFilterChange = (event) => {
    setFilters((prev) => ({ ...prev, title: event.target.value }));
  };

  const handleDateFilterChange = (event) => {
    setFilters((prev) => ({ ...prev, date: event.target.value }));
  };

  const handleStatusFilterChange = (event) => {
    setFilters((prev) => ({ ...prev, status: event.target.value }));
  };

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!tasks) return <LoadingMessage>Loading...</LoadingMessage>;

  return (
    <Container>
      <Heading>My Tasks</Heading>
      <FiltersSection>
        <FilterLabel>
          <FilterCaption>Title</FilterCaption>
          <FilterInput
            type="text"
            placeholder="Search by title"
            value={filters.title}
            onChange={handleTitleFilterChange}
          />
        </FilterLabel>
        <FilterLabel>
          <FilterCaption>Date</FilterCaption>
          <FilterInput
            type="date"
            value={filters.date}
            onChange={handleDateFilterChange}
          />
        </FilterLabel>
        <FilterLabel>
          <FilterCaption>Status</FilterCaption>
          <FilterSelect
            value={filters.status}
            onChange={handleStatusFilterChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
          </FilterSelect>
        </FilterLabel>
      </FiltersSection>
      {tasks.length === 0 ? (
        <EmptyState>No tasks yet. Create your first task!</EmptyState>
      ) : (
        <TasksGrid>
          {tasks.map((task) => (
            <TodoCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              createdAt={task.createdAt}
              onToggle={() => handleToggleCompleted(task.id, task.completed)}
              onEdit={(updates) => handleEditTask(task.id, updates)}
              onDelete={() => handleDeleteTask(task.id)}
              onUpload={(file) => uploadAttachment(task.id, file)}
              getPreviewUrl={(key) => getPreviewUrl(task.id, key)}
              attachments={task.attachments}
              onDeleteAttachment={(key) => deleteAttachment(task.id, key)}
            />
          ))}
        </TasksGrid>
      )}
    </Container>
  );
}
