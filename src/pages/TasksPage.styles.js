import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 6vh auto;
`;

export const Heading = styled.h1`
  margin-bottom: 16px;
`;

export const FiltersSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 24px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
`;

export const FilterLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FilterCaption = styled.span`
  font-size: 14px;
  color: #475569;
`;

const baseFieldStyles = `
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #cbd5f5;
  font-size: 14px;
  background: white;
`;

export const FilterInput = styled.input`
  ${baseFieldStyles}
`;

export const FilterSelect = styled.select`
  ${baseFieldStyles}
`;

export const EmptyState = styled.p`
  color: #64748b;
  margin-top: 16px;
`;

export const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
`;

export const ErrorMessage = styled.p`
  color: crimson;
`;

export const LoadingMessage = styled.p`
  color: #0f172a;
`;
