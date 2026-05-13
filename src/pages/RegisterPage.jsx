import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getToken, register } from "../api/auth";
import {
  Container,
  Title,
  Form,
  Label,
  Input,
  SubmitButton,
  ErrorText,
} from "./LoginPage.styles";

export default function RegisterPage() {
  const nav = useNavigate();
  const token = getToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password);
      nav("/tasks", { replace: true });
    } catch {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  if (token) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <Container>
      <Title>Create account</Title>
      <Form onSubmit={onSubmit}>
        <Label>Email</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <Label>Password</Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          minLength={6}
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </SubmitButton>
      </Form>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}
