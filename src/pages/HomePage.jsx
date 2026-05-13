import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../api/auth";
import {
  Actions,
  Button,
  Hero,
  Lead,
  Page,
  Title,
  SmallTitle,
} from "./HomePage.styles";

function getEmailFromToken(token) {
  if (!token) {
    return "";
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.email || "";
  } catch {
    return "";
  }
}

export default function HomePage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(getToken()),
  );
  const [email, setEmail] = useState(() => getEmailFromToken(getToken()));

  useEffect(() => {
    const handleStorage = () => {
      const token = getToken();
      setIsAuthenticated(Boolean(token));
      setEmail(getEmailFromToken(token));
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    clearToken();
    setIsAuthenticated(false);
    setEmail("");
  };

  return (
    <Page>
      <Hero>
        <Lead>Welcome to</Lead>
        <Title>Your Todo Workspace</Title>
        {email && <SmallTitle>{email}</SmallTitle>}
      </Hero>

      <Actions>
        {!isAuthenticated && (
          <>
            <Button type="button" onClick={handleLogin} variant="secondary">
              Login
            </Button>
            <Button type="button" onClick={handleRegister} variant="primary">
              Register
            </Button>
          </>
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
