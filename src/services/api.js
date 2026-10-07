export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function request(path, { raw, ...options } = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL + path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  if (!res.ok) throw new Error(res.status === 401 ? "Sessão expirada. Entre novamente." : `Erro ${res.status} ao falar com a API.`);
  return raw ? res.blob() : res.json();
}
export const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));
