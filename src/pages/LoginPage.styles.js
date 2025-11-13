import styled from "styled-components";

export const Container = styled.div`
  max-width: 360px;
  margin: 10vh auto;
`;

export const Title = styled.h1`
  margin-bottom: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
`;

export const SubmitButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

export const ErrorText = styled.p`
  color: crimson;
  margin-top: 12px;
`;
