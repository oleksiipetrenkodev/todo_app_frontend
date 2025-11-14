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

  useEffect(() => {
    let mounted = true;

    const fetchFiltered = async () => {
      try {
        const cleanFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== "" && v !== "all")
        );

        const params = new URLSearchParams(cleanFilters);
        window.history.replaceState(null, "", `?${params.toString()}`);

        const { data } = await client.get("/tasks", {
          params: {
            title: filters.title,
            date: filters.date,
            status: filters.status,
          },
        });

        if (mounted) setTasks(data);
      } catch (err) {
        if (mounted) setError("Failed to load tasks");
      }
    };

    fetchFiltered();

    return () => {
      mounted = false;
    };
  }, [filters]);

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
        </TasksGrid>
      )}
    </Container>
  );
}
