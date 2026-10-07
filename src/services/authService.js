import { USE_MOCK, request, wait } from "./api";

export async function login(email, senha, perfil) {
  if (USE_MOCK) {
    await wait();
    return { token: "mock-jwt", usuario: { nome: email.split("@")[0], perfil } };
  }
  return request("/auth/login", { method: "POST", body: JSON.stringify({ email, senha }) });
}
