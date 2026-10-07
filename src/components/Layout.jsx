import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const MENU = [
  { to: "/", label: "Painel", perfis: null },
  { to: "/municipios", label: "Municípios", perfis: ["Administrador"] },
  // UC02: o Pesquisador (e o Administrador) configura critérios e pesos
  { to: "/criterios", label: "Critérios", perfis: ["Administrador", "Pesquisador"] },
  { to: "/topsis", label: "TOPSIS", perfis: null },
  { to: "/simulacoes", label: "Simulações", perfis: null },
  { to: "/usuarios", label: "Usuários", perfis: ["Administrador"] },
];

export default function Layout() {
  const { user, sair } = useAuth();
  return (
    <>
      <header className="topo">
        <strong>Energia Renovável</strong>
        <nav>
          {MENU.filter((m) => !m.perfis || m.perfis.includes(user.perfil)).map((m) => (
            <NavLink key={m.to} to={m.to} end={m.to === "/"}>{m.label}</NavLink>
          ))}
        </nav>
        <span className="user"><Link to="/conta" title="Minha conta">{user.nome}</Link> ({user.perfil}) <button className="link" onClick={sair}>Sair</button></span>
      </header>
      <main><Outlet /></main>
    </>
  );
}
