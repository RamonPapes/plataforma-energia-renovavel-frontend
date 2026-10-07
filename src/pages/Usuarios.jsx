import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { PERFIS, useAuth } from "../hooks/useAuth";
import { atualizarUsuario, criarUsuario, listarUsuarios, removerUsuario } from "../services/usuarioService";
import { fmtDia } from "../utils/formatadores";

const VAZIO = { nome: "", email: "", senha: "", perfil: "Pesquisador" };

// RF08: o Administrador cadastra, edita e remove usuários e define o perfil de acesso de cada um
export default function Usuarios() {
  const { user, atualizarSessao } = useAuth();
  const [filtro, setFiltro] = useState("");
  const { data, loading, error, reload } = useFetch(() => listarUsuarios(filtro), [filtro]);
  const [f, setF] = useState(VAZIO);
  const [editando, setEditando] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState({ ok: "", erro: "" });

  function editar(u) {
    setEditando(u.id);
    setF({ nome: u.nome, email: u.email, senha: "", perfil: u.perfil });
    setMsg({ ok: "", erro: "" });
  }
  function cancelar() {
    setEditando(null);
    setF(VAZIO);
  }
  async function salvar(e) {
    e.preventDefault();
    setSalvando(true);
    try {
      const dados = { ...f, nome: f.nome.trim(), email: f.email.trim().toLowerCase() };
      if (editando) {
        const salvo = await atualizarUsuario(editando, dados);
        if (editando === user.id) atualizarSessao({ nome: salvo.nome, email: salvo.email });
        setMsg({ ok: `Usuário ${salvo.nome} atualizado.`, erro: "" });
      } else {
        const novo = await criarUsuario(dados);
        setMsg({ ok: `Usuário ${novo.nome} cadastrado.`, erro: "" });
      }
      cancelar();
      reload();
    } catch (err) {
      setMsg({ ok: "", erro: err.message });
    } finally {
      setSalvando(false);
    }
  }
  async function remover(u) {
    if (!window.confirm(`Remover o usuário ${u.nome} (${u.email})?`)) return;
    try {
      await removerUsuario(u.id);
      if (editando === u.id) cancelar();
      setMsg({ ok: `Usuário ${u.nome} removido.`, erro: "" });
      reload();
    } catch (err) {
      setMsg({ ok: "", erro: err.message });
    }
  }
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <>
      <h1>Usuários</h1>
      <p className="nota">Administrador: acesso total. Pesquisador: configura critérios, pesos e a matriz de decisão. Gestor Público: consulta, executa o TOPSIS e baixa relatórios.</p>
      {(msg.ok || msg.erro) && <p className={msg.erro ? "erro" : "ok"} role="status">{msg.erro || msg.ok}</p>}
      <div className="grid-2">
        <div className="card">
          <label className="filtro">Perfil
            <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
              <option value="">Todos</option>
              {PERFIS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          {loading ? <p>Carregando…</p> : error ? <p className="erro">{error}</p> : data.length === 0 ? <p className="vazio">Nenhum usuário com esse perfil.</p> : (
            <div className="rolagem">
              <table>
                <thead><tr><th>Nome</th><th>Perfil</th><th>Desde</th><th /></tr></thead>
                <tbody>
                  {data.map((u) => (
                    <tr key={u.id} className={editando === u.id ? "selecionada" : undefined}>
                      <td>{u.nome}{u.id === user.id && <small> (você)</small>}<br /><small className="nota">{u.email}</small></td>
                      <td>{u.perfil}</td>
                      <td>{u.created_at ? fmtDia(u.created_at) : "—"}</td>
                      <td className="botoes">
                        <button className="ghost" onClick={() => editar(u)}>Editar</button>
                        {/* a API não deixa o administrador remover a própria conta */}
                        {u.id !== user.id && <button className="ghost perigo" onClick={() => remover(u)}>Remover</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <form className="card" onSubmit={salvar}>
          <h2>{editando ? "Editar usuário" : "Novo usuário"}</h2>
          <label>Nome<input required maxLength={150} value={f.nome} onChange={set("nome")} /></label>
          <label>E-mail<input required type="email" maxLength={150} value={f.email} onChange={set("email")} /></label>
          {editando ? (
            <p className="nota">A senha não é alterada aqui: cada usuário troca a própria em “Minha conta”.</p>
          ) : (
            <label>Senha inicial<input required type="password" minLength={6} autoComplete="new-password" value={f.senha} onChange={set("senha")} /></label>
          )}
          <label>Perfil
            <select value={f.perfil} onChange={set("perfil")} disabled={editando === user.id}>{PERFIS.map((p) => <option key={p}>{p}</option>)}</select>
          </label>
          {editando === user.id && <p className="nota">Você não pode alterar o seu próprio perfil.</p>}
          <div className="acoes">
            <button type="submit" disabled={salvando}>{salvando ? "Salvando…" : editando ? "Salvar alterações" : "Cadastrar usuário"}</button>
            {editando && <button type="button" className="ghost" onClick={cancelar}>Cancelar</button>}
          </div>
        </form>
      </div>
    </>
  );
}
