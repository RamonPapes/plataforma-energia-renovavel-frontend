import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const MENU = [
  { to: "/", label: "Painel", perfis: null },
  { to: "/municipios", label: "Municípios", perfis: ["Administrador"] },
  { to: "/criterios", label: "Critérios", perfis: ["Administrador"] },
  { to: "/topsis", label: "TOPSIS", perfis: null },
  { to: "/simulacoes", label: "Simulações", perfis: null },
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
        <span className="user">{user.nome} ({user.perfil}) <button className="link" onClick={sair}>Sair</button></span>
      </header>
      <main><Outlet /></main>
    </>
  );
}
