import { useState } from "react";
import { Link } from "react-router-dom";
import { redefinirSenha, solicitarCodigoRedefinicao } from "../services/authService";
import { fmtData } from "../utils/formatadores";

// "Esqueci minha senha" em duas etapas: pedir o código pelo e-mail e trocar a senha com ele
export default function EsqueciSenha() {
  const [etapa, setEtapa] = useState(1);
  const [f, setF] = useState({ email: "", codigo: "", novaSenha: "", confirmacao: "" });
  const [expiraEm, setExpiraEm] = useState(null);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function executar(acao) {
    setErro("");
    setEnviando(true);
    try {
      await acao();
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }
  const pedirCodigo = (e) => {
    e.preventDefault();
    executar(async () => {
      const { token, expiraEm } = await solicitarCodigoRedefinicao(f.email.trim().toLowerCase());
      // sem envio por e-mail no backend, o código chega na resposta e já é preenchido
      setF({ ...f, codigo: token });
      setExpiraEm(expiraEm);
      setEtapa(2);
    });
  };
  const trocarSenha = (e) => {
    e.preventDefault();
    if (f.novaSenha !== f.confirmacao) return setErro("A confirmação não confere com a nova senha.");
    executar(async () => {
      await redefinirSenha(f.codigo.trim(), f.novaSenha);
      setEtapa(3);
    });
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="login">
      <div className="card">
        <h1>Redefinir senha</h1>
        {etapa === 1 && (
          <form onSubmit={pedirCodigo}>
            <p className="nota">Informe o e-mail cadastrado para gerar um código de redefinição (válido por 30 minutos).</p>
            <label>E-mail<input type="email" required value={f.email} onChange={set("email")} /></label>
            {erro && <p className="erro" role="alert">{erro}</p>}
            <button type="submit" disabled={enviando}>{enviando ? "Gerando…" : "Gerar código"}</button>
          </form>
        )}
        {etapa === 2 && (
          <form onSubmit={trocarSenha}>
            <p className="nota">
              Código gerado{expiraEm && `, válido até ${fmtData(expiraEm)}`}. Nesta versão ele é exibido aqui;
              em produção será enviado por e-mail.
            </p>
            <label>Código<input required value={f.codigo} onChange={set("codigo")} /></label>
            <label>Nova senha<input required type="password" minLength={6} autoComplete="new-password" value={f.novaSenha} onChange={set("novaSenha")} /></label>
            <label>Confirme a nova senha<input required type="password" minLength={6} autoComplete="new-password" value={f.confirmacao} onChange={set("confirmacao")} /></label>
            {erro && <p className="erro" role="alert">{erro}</p>}
            <button type="submit" disabled={enviando}>{enviando ? "Salvando…" : "Redefinir senha"}</button>
          </form>
        )}
        {etapa === 3 && <p className="ok" role="status">Senha redefinida. Entre com a nova senha.</p>}
        <p><Link to="/login">Voltar para o login</Link></p>
      </div>
    </div>
  );
}
