import { USE_MOCK, request, wait } from "./api";
import { db } from "./mockData";
import { PERFIS_API } from "./authService";

// as telas usam o nome do perfil por extenso; a API, o código (ADMINISTRADOR, PESQUISADOR, GESTOR_PUBLICO)
const CODIGOS_PERFIL = Object.fromEntries(Object.entries(PERFIS_API).map(([codigo, nome]) => [nome, codigo]));
const daApi = (u) => ({ ...u, perfil: PERFIS_API[u.perfil] });
const paraApi = ({ nome, email, senha, perfil }) => ({ nome, email, senha, perfil: CODIGOS_PERFIL[perfil] });

// RF08: gestão de usuários (somente Administrador)
export async function listarUsuarios(perfil) {
  if (!USE_MOCK) {
    const filtro = perfil ? `&perfil=${CODIGOS_PERFIL[perfil]}` : "";
    return (await request(`/usuarios?limit=100${filtro}`)).data.map(daApi);
  }
  await wait();
  return db.usuarios.filter((u) => !perfil || u.perfil === perfil).sort((a, b) => a.nome.localeCompare(b.nome));
}
export async function criarUsuario(dados) {
  if (!USE_MOCK) return daApi(await request("/usuarios", { method: "POST", body: JSON.stringify(paraApi(dados)) }));
  await wait();
  if (db.usuarios.some((u) => u.email === dados.email)) throw new Error("E-mail já cadastrado.");
  const { senha, ...novo } = { ...dados, id: Date.now(), created_at: new Date().toISOString() };
  db.usuarios.push(novo);
  return novo;
}
// a senha não é alterada aqui: cada usuário troca a própria em "Minha conta"
export async function atualizarUsuario(id, { nome, email, perfil }) {
  if (!USE_MOCK) return daApi(await request(`/usuarios/${id}`, { method: "PUT", body: JSON.stringify(paraApi({ nome, email, perfil })) }));
  await wait();
  const usuario = db.usuarios.find((u) => u.id === id);
  Object.assign(usuario, { nome, email, perfil });
  return { ...usuario };
}
export async function removerUsuario(id) {
  if (!USE_MOCK) return request(`/usuarios/${id}`, { method: "DELETE" });
  await wait();
  db.usuarios = db.usuarios.filter((u) => u.id !== id);
}

// Rotas do próprio usuário (qualquer perfil)
export async function obterMinhaConta() {
  if (!USE_MOCK) return daApi(await request("/usuarios/me"));
  await wait();
  return JSON.parse(localStorage.getItem("usuario"));
}
export async function alterarMinhaSenha(senhaAtual, novaSenha) {
  if (!USE_MOCK) return request("/usuarios/me/senha", { method: "PATCH", body: JSON.stringify({ senhaAtual, novaSenha }) });
  await wait();
}
