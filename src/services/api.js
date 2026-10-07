export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
export const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function request(path, { raw, ...options } = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL + path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  if (!res.ok) {
    // token inválido ou expirado: limpa a sessão e volta para o login
    if (res.status === 401 && token) {
      localStorage.clear();
      window.location.assign("/login");
      throw new Error("Sessão expirada. Entre novamente.");
    }
    // a API devolve os erros no formato { error: "mensagem" }
    const corpo = await res.json().catch(() => null);
    throw new Error(corpo?.error ?? `Erro ${res.status} ao falar com a API.`);
  }
  if (res.status === 204) return null;
  return raw ? res.blob() : res.json();
}
export const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));
