import RankingChart from "./RankingChart";
import MapaVulnerabilidade from "./MapaVulnerabilidade";
import { fmtCi, corCi } from "../utils/formatadores";
import { exportarCSV } from "../utils/exportar";
import { exportarPdf } from "../services/topsisService";

export default function ResultadoTopsis({ simulacao }) {
  const { ranking, id } = simulacao;
  return (
    <section className="resultado">
      <p className="nota">Quanto mais perto de 1, maior a vulnerabilidade do município.</p>
      <div className="grid-2">
        <div className="card"><RankingChart ranking={ranking} /></div>
        <div className="card"><MapaVulnerabilidade ranking={ranking} /></div>
      </div>
      <div className="card">
        <table>
          <thead><tr><th>Posição</th><th>Município</th><th>UF</th><th>Ci</th></tr></thead>
          <tbody>
            {ranking.map((r) => (
              <tr key={r.municipio_id}>
                <td>{r.posicao}º</td><td>{r.nome}</td><td>{r.uf}</td>
                <td style={{ color: corCi(r.ci), fontWeight: 600 }}>{fmtCi(r.ci)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="acoes">
          <button onClick={() => exportarCSV(ranking, `simulacao-${id}`)}>Exportar CSV</button>
          <button className="ghost" onClick={() => exportarPdf(id)}>Exportar PDF</button>
        </div>
      </div>
    </section>
  );
}
