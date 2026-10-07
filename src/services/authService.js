import { USE_MOCK, request, wait } from "./api";

// a API usa os códigos dos perfis; o front usa os nomes por extenso (menus e rotas protegidas)
const PERFIS_API = { ADMINISTRADOR: "Administrador", PESQUISADOR: "Pesquisador", GESTOR_PUBLICO: "Gestor Público" };

export async function login(email, senha, perfil) {
  if (USE_MOCK) {
    await wait();
    return { token: "mock-jwt", usuario: { nome: email.split("@")[0], perfil } };
  }
  const { token, usuario } = await request("/login", { method: "POST", body: JSON.stringify({ email, senha }) });
  return { token, usuario: { ...usuario, perfil: PERFIS_API[usuario.perfil] } };
}
