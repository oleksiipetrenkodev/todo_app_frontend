import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 24px;
`;

export const Hero = styled.div`
  max-width: 540px;
`;

export const Lead = styled.p`
  text-transform: uppercase;
  letter-spacing: 4px;
  margin: 0;
`;

export const Title = styled.h1`
  font-size: 48px;
  margin: 8px 0;
`;

export const Description = styled.p`
  color: #475569;
  max-width: 420px;
  margin: 0 auto;
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;
`;

export const Button = styled.button`
  padding: 12px 18px;
  border-radius: 999px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  min-width: 120px;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === "primary" ? "#2563eb" : "#f1f5f9")};
  color: ${({ variant }) => (variant === "primary" ? "white" : "#0f172a")};
`;
