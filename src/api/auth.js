import client from "./client";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

export async function login(email, password) {
  const { data } = await client.post("/login", { email, password });
  if (data?.token) {
    setToken(data.token);
  }
  return data;
}
