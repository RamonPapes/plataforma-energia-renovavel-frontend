import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import ResultadoTopsis from "../components/ResultadoTopsis";
import { useFetch } from "../hooks/useFetch";
import { listarMunicipios } from "../services/municipioService";
import { listarCriterios } from "../services/criterioService";
import { listarSimulacoes } from "../services/topsisService";

export default function Dashboard() {
  const { data, loading, error } = useFetch(() => Promise.all([listarMunicipios(), listarCriterios(), listarSimulacoes()]));
  if (loading) return <p>Carregando…</p>;
  if (error) return <p className="erro">{error}</p>;
  const [municipios, criterios, simulacoes] = data;
  const ultima = simulacoes[0];
  // o ranking vai do menos para o mais vulnerável
  const maisVulneravel = ultima?.ranking[ultima.ranking.length - 1];
  return (
    <>
      <h1>Painel</h1>
      <div className="stats">
        <StatCard valor={municipios.length} rotulo="municípios cadastrados" />
        <StatCard valor={criterios.length} rotulo="critérios de vulnerabilidade" />
        <StatCard valor={simulacoes.length} rotulo="simulações executadas" />
        <StatCard valor={maisVulneravel ? `${maisVulneravel.nome}/${maisVulneravel.uf}` : "—"} rotulo="mais vulnerável na última simulação" />
      </div>
      {ultima ? <ResultadoTopsis simulacao={ultima} /> : (
        <div className="card vazio">Nenhuma simulação ainda. <Link to="/topsis">Execute o TOPSIS</Link> para ver o ranking e o mapa aqui.</div>
      )}
    </>
  );
}
