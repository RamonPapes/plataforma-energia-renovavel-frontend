import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { alterarMinhaSenha, obterMinhaConta } from "../services/usuarioService";
import { fmtDia } from "../utils/formatadores";

const VAZIO = { senhaAtual: "", novaSenha: "", confirmacao: "" };

// Dados do usuário logado e troca da própria senha (qualquer perfil)
export default function MinhaConta() {
  const { data: conta, loading, error } = useFetch(obterMinhaConta);
  const [f, setF] = useState(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState({ ok: "", erro: "" });
  if (loading) return <p>Carregando…</p>;
  if (error) return <p className="erro">{error}</p>;

  async function trocarSenha(e) {
    e.preventDefault();
    if (f.novaSenha !== f.confirmacao) return setMsg({ ok: "", erro: "A confirmação não confere com a nova senha." });
    setSalvando(true);
    try {
      await alterarMinhaSenha(f.senhaAtual, f.novaSenha);
      setF(VAZIO);
      setMsg({ ok: "Senha alterada.", erro: "" });
    } catch (err) {
      setMsg({ ok: "", erro: err.message });
    } finally {
      setSalvando(false);
    }
  }
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <>
      <h1>Minha conta</h1>
      <div className="grid-2">
        <div className="card">
          <h2>Dados</h2>
          <dl className="dados">
            <dt>Nome</dt><dd>{conta.nome}</dd>
            <dt>E-mail</dt><dd>{conta.email}</dd>
            <dt>Perfil</dt><dd>{conta.perfil}</dd>
            {conta.created_at && <><dt>Cadastrado em</dt><dd>{fmtDia(conta.created_at)}</dd></>}
          </dl>
          <p className="nota">Nome, e-mail e perfil são alterados por um administrador.</p>
        </div>
        <form className="card" onSubmit={trocarSenha}>
          <h2>Trocar senha</h2>
          <label>Senha atual<input required type="password" autoComplete="current-password" value={f.senhaAtual} onChange={set("senhaAtual")} /></label>
          <label>Nova senha<input required type="password" minLength={6} autoComplete="new-password" value={f.novaSenha} onChange={set("novaSenha")} /></label>
          <label>Confirme a nova senha<input required type="password" minLength={6} autoComplete="new-password" value={f.confirmacao} onChange={set("confirmacao")} /></label>
          {(msg.ok || msg.erro) && <p className={msg.erro ? "erro" : "ok"} role="status">{msg.erro || msg.ok}</p>}
          <button type="submit" disabled={salvando}>{salvando ? "Salvando…" : "Trocar senha"}</button>
        </form>
      </div>
    </>
  );
}
