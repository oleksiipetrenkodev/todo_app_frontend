import styled from "styled-components";

export const Container = styled.div`
  max-width: 640px;
  margin: 10vh auto;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
`;

export const Title = styled.h1`
  margin-bottom: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldCaption = styled.span`
  font-weight: 600;
`;

export const TextInput = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
`;

export const ErrorText = styled.p`
  color: crimson;
  margin-top: -4px;
`;

export const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: ${({ disabled }) => (disabled ? "#94a3b8" : "#2563eb")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.15s ease;
`;
