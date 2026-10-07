import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { listarMunicipios } from "../services/municipioService";
import { listarCriterios } from "../services/criterioService";
import { executarTopsis } from "../services/topsisService";
import ResultadoTopsis from "../components/ResultadoTopsis";

export default function ExecutarTopsis() {
  const { data, loading, error } = useFetch(() => Promise.all([listarMunicipios(), listarCriterios()]));
  const [ids, setIds] = useState([]);
  const [criterios, setCriterios] = useState([]);
  const [sim, setSim] = useState(null);
  const [rodando, setRodando] = useState(false);
  useEffect(() => {
    if (data) { setIds(data[0].map((m) => m.id)); setCriterios(data[1]); }
  }, [data]);
  if (loading) return <p>Carregando…</p>;
  if (error) return <p className="erro">{error}</p>;

  const alternar = (id) => setIds(ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]);
  async function executar() {
    setRodando(true);
    setSim(await executarTopsis({ municipioIds: ids, criterios }));
    setRodando(false);
  }
  return (
    <>
      <h1>Executar TOPSIS</h1>
      <div className="grid-2">
        <fieldset className="card">
          <legend>Municípios na análise</legend>
          {data[0].map((m) => <label key={m.id} className="check"><input type="checkbox" checked={ids.includes(m.id)} onChange={() => alternar(m.id)} />{m.nome}/{m.uf}</label>)}
        </fieldset>
        <fieldset className="card">
          <legend>Pesos desta simulação</legend>
          {criterios.map((c) => (
            <label key={c.id}>{c.nome}: {c.peso.toFixed(2)}
              <input type="range" min="0" max="1" step="0.05" value={c.peso} onChange={(e) => setCriterios(criterios.map((x) => (x.id === c.id ? { ...x, peso: Number(e.target.value) } : x)))} />
            </label>
          ))}
        </fieldset>
      </div>
      <div className="acoes">
        <button disabled={ids.length < 2 || rodando} onClick={executar}>{rodando ? "Calculando…" : "Calcular ranking"}</button>
        {ids.length < 2 && <span className="erro">Selecione pelo menos 2 municípios.</span>}
      </div>
      {sim && <ResultadoTopsis simulacao={sim} />}
    </>
  );
}
