import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: box-shadow 0.2s;
  background: #ffffff;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const CheckboxLabel = styled.label`
  position: relative;
  display: inline-block;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 2px;
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 0;
  height: 0;
`;

export const CheckboxBox = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  background-color: ${({ $completed }) => ($completed ? "#10b981" : "#ffffff")};
  transition: all 0.2s;
  position: relative;
`;

export const CheckIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  color: #ffffff;
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

export const EditFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TitleInput = styled.input`
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 16px;
  font-weight: 600;
`;

export const DescriptionInput = styled.textarea`
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
`;

export const TitleText = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ $completed }) => ($completed ? "#6b7280" : "#111827")};
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  margin-bottom: 4px;
`;

export const DescriptionText = styled.div`
  font-size: 14px;
  color: ${({ $completed }) => ($completed ? "#9ca3af" : "#4b5563")};
  line-height: 1.5;
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
`;

export const IdText = styled.div`
  font-size: 12px;
  color: "#4b5563";
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid #f3f4f6;
  gap: 5px;
`;

export const Meta = styled.div`
  font-size: 12px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const EditActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const SaveButton = styled.button`
  padding: 4px 12px;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background-color: ${({ disabled }) => (disabled ? "#94a3b8" : "#10b981")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.15s;
`;

export const CancelButton = styled.button`
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  background-color: #ffffff;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.15s;
`;

export const IconButton = styled.button`
  padding: 6px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const EditIcon = styled.svg`
  color: #9ca3af;
`;

export const ClockIcon = styled.svg`
  color: #9ca3af;
`;
