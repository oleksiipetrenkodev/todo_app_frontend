import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../api/auth";
import { Actions, Button, Description, Hero, Lead, Page, Title } from "./HomePage.styles";

export default function HomePage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(getToken())
  );

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(Boolean(getToken()));
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    clearToken();
    setIsAuthenticated(false);
  };

  return (
    <Page>
      <Hero>
        <Lead>Welcome to</Lead>
        <Title>Your Todo Workspace</Title>
        <Description>
          Jump in to manage your tasks. Sign in to access private routes, or sign out when you are done.
        </Description>
      </Hero>

      <Actions>
        {!isAuthenticated && (
          <Button type="button" onClick={handleLogin} variant="primary">
            Login
          </Button>
        )}
        {isAuthenticated && (
          <Button type="button" onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        )}
      </Actions>
    </Page>
  );
}
