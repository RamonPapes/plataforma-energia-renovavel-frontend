import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { PERFIS, useAuth } from "../hooks/useAuth";

export default function Login() {
  const { user, entrar } = useAuth();
  const navigate = useNavigate();
  const [f, setF] = useState({ email: "", senha: "", perfil: PERFIS[1] });
  const [erro, setErro] = useState("");
  if (user) return <Navigate to="/" replace />;

  async function enviar(e) {
    e.preventDefault();
    try {
      await entrar(f.email, f.senha, f.perfil);
      navigate("/");
    } catch (err) {
      setErro(err.message);
    }
  }
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="login">
      <form onSubmit={enviar} className="card">
        <h1>Entrar</h1>
        <label>E-mail<input type="email" required value={f.email} onChange={set("email")} /></label>
        <label>Senha<input type="password" required value={f.senha} onChange={set("senha")} /></label>
        <label>Perfil
          <select value={f.perfil} onChange={set("perfil")}>{PERFIS.map((p) => <option key={p}>{p}</option>)}</select>
        </label>
        {erro && <p className="erro" role="alert">{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
