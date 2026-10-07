import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { criarCriterio, listarCriterios, salvarPesos } from "../services/criterioService";

const NOVO = { nome: "", tipo: "B", unidade: "", peso: 0.1 };

export default function Criterios() {
  const { data, loading, error, reload } = useFetch(listarCriterios);
  const [lista, setLista] = useState([]);
  const [novo, setNovo] = useState(NOVO);
  const [msg, setMsg] = useState("");
  useEffect(() => { if (data) setLista(data); }, [data]);
  if (loading) return <p>Carregando…</p>;
  if (error) return <p className="erro">{error}</p>;

  const mudar = (id, campo, valor) => setLista(lista.map((c) => (c.id === id ? { ...c, [campo]: valor } : c)));
  async function salvar() {
    await salvarPesos(lista);
    setMsg("Pesos salvos.");
  }
  async function adicionar(e) {
    e.preventDefault();
    await criarCriterio({ ...novo, peso: Number(novo.peso) });
    setNovo(NOVO);
    reload();
  }
  const tipos = <><option value="B">Benefício</option><option value="C">Custo</option></>;
  return (
    <>
      <h1>Critérios e pesos</h1>
      <p className="nota">Benefício (B): quanto maior o valor, melhor (menos vulnerável). Custo (C): quanto maior o valor, pior (mais vulnerável). Ao salvar, os pesos são normalizados para somar 1.</p>
      <div className="card">
        <table>
          <thead><tr><th>Critério</th><th>Tipo</th><th>Peso</th></tr></thead>
          <tbody>
            {lista.map((c) => (
              <tr key={c.id}>
                <td>{c.nome} <small>({c.unidade})</small></td>
                <td><select value={c.tipo} onChange={(e) => mudar(c.id, "tipo", e.target.value)}>{tipos}</select></td>
                <td><input type="range" min="0" max="1" step="0.05" value={c.peso} onChange={(e) => mudar(c.id, "peso", Number(e.target.value))} aria-label={`Peso de ${c.nome}`} /> {c.peso.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="acoes"><button onClick={salvar}>Salvar pesos</button>{msg && <span className="ok">{msg}</span>}</div>
      </div>
      <form className="card linha" onSubmit={adicionar}>
        <label>Novo critério<input required value={novo.nome} onChange={(e) => setNovo({ ...novo, nome: e.target.value })} /></label>
        <label>Unidade<input required value={novo.unidade} onChange={(e) => setNovo({ ...novo, unidade: e.target.value })} /></label>
        <label>Tipo<select value={novo.tipo} onChange={(e) => setNovo({ ...novo, tipo: e.target.value })}>{tipos}</select></label>
        <button type="submit">Adicionar critério</button>
      </form>
    </>
  );
}
