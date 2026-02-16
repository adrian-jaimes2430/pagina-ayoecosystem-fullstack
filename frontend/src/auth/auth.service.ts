import api from "./services/api";

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login-jwt", { email, password });
  localStorage.setItem("access_token", res.data.access_token);
  return res.data.user;
}

export async function logout() {
  await api.post("/auth/logout");
  localStorage.removeItem("access_token");
}

export async function getMe() {
  const res = await api.get("/auth/me");
  return res.data;
}
