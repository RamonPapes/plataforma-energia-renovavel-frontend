import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { listarSimulacoes } from "../services/topsisService";
import ResultadoTopsis from "../components/ResultadoTopsis";
import { fmtData } from "../utils/formatadores";

export default function Simulacoes() {
  const { data, loading, error } = useFetch(listarSimulacoes);
  const [aberta, setAberta] = useState(null);
  if (loading) return <p>Carregando…</p>;
  if (error) return <p className="erro">{error}</p>;
  const sim = data.find((s) => s.id === aberta);
  return (
    <>
      <h1>Simulações e relatórios</h1>
      {data.length === 0 ? <div className="card vazio">O histórico está vazio. Cada cálculo do TOPSIS fica salvo aqui.</div> : (
        <div className="card">
          <table>
            <thead><tr><th>Simulação</th><th>Executada em</th><th>Mais vulnerável</th><th /></tr></thead>
            <tbody>
              {data.map((s) => (
                <tr key={s.id}>
                  <td>#{s.id}</td><td>{fmtData(s.data_execucao)}</td><td>{s.ranking[0].nome}/{s.ranking[0].uf}</td>
                  <td><button className="ghost" onClick={() => setAberta(s.id)}>Ver resultado</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {sim && <ResultadoTopsis simulacao={sim} />}
    </>
  );
}
