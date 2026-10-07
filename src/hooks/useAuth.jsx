import { createContext, useContext, useState } from "react";
import * as authService from "../services/authService";

export const PERFIS = ["Administrador", "Pesquisador", "Gestor Público"];
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("usuario") || "null"));

  async function entrar(email, senha, perfil) {
    const { token, usuario } = await authService.login(email, senha, perfil);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUser(usuario);
  }
  // mantém a sessão em dia quando o próprio usuário é editado (nome, e-mail)
  function atualizarSessao(dados) {
    const usuario = { ...user, ...dados };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUser(usuario);
  }
  function sair() {
    localStorage.clear();
    setUser(null);
  }
  return <AuthContext.Provider value={{ user, entrar, sair, atualizarSessao }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
