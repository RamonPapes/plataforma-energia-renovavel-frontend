import { USE_MOCK, request, wait } from "./api";

// a API usa os códigos dos perfis; o front usa os nomes por extenso (menus e rotas protegidas)
export const PERFIS_API = { ADMINISTRADOR: "Administrador", PESQUISADOR: "Pesquisador", GESTOR_PUBLICO: "Gestor Público" };

export async function login(email, senha, perfil) {
  if (USE_MOCK) {
    await wait();
    return { token: "mock-jwt", usuario: { id: 1, nome: email.split("@")[0], email, perfil } };
  }
  const { token, usuario } = await request("/login", { method: "POST", body: JSON.stringify({ email, senha }) });
  return { token, usuario: { ...usuario, perfil: PERFIS_API[usuario.perfil] } };
}

// "Esqueci minha senha", etapa 1: a API gera um código válido por 30 minutos.
// Enquanto não há envio por e-mail (limitação do backend), o código vem na própria resposta.
export async function solicitarCodigoRedefinicao(email) {
  if (USE_MOCK) {
    await wait();
    return { token: "codigo-de-teste", expiraEm: new Date(Date.now() + 30 * 60 * 1000).toISOString() };
  }
  return request("/esqueci-senha", { method: "POST", body: JSON.stringify({ email }) });
}
// Etapa 2: troca a senha com o código
export async function redefinirSenha(token, novaSenha) {
  if (USE_MOCK) return wait();
  return request("/redefinir-senha", { method: "POST", body: JSON.stringify({ token, novaSenha }) });
}
