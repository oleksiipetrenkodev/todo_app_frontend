import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getToken, login } from "../api/auth";
import {
  Container,
  Title,
  Form,
  Label,
  Input,
  SubmitButton,
  ErrorText,
} from "./LoginPage.styles";

export default function LoginPage() {
  const nav = useNavigate();
  const token = getToken();
  const [email, setEmail] = useState("oleksii@example.com");
  const [password, setPassword] = useState("oleksii");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      nav("/tasks", { replace: true });
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  if (token) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <Container>
      <Title>Sign in</Title>
      <Form onSubmit={onSubmit}>
        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <Label>Password</Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </SubmitButton>
      </Form>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}
