import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { criarMunicipio, listarMunicipios } from "../services/municipioService";
import { listarCriterios } from "../services/criterioService";
import { fmtNumero } from "../utils/formatadores";

const VAZIO = { nome: "", uf: "", populacao: "", lat: "", lng: "" };

export default function Municipios() {
  const { data, loading, error, reload } = useFetch(() => Promise.all([listarMunicipios(), listarCriterios()]));
  const [f, setF] = useState(VAZIO);
  const [valores, setValores] = useState({});
  if (loading) return <p>Carregando…</p>;
  if (error) return <p className="erro">{error}</p>;
  const [municipios, criterios] = data;

  async function salvar(e) {
    e.preventDefault();
    await criarMunicipio({
      ...f, uf: f.uf.toUpperCase(), populacao: Number(f.populacao), lat: Number(f.lat), lng: Number(f.lng),
      valores: Object.fromEntries(Object.entries(valores).map(([k, v]) => [k, Number(v)])),
    });
    setF(VAZIO);
    setValores({});
    reload();
  }
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <>
      <h1>Municípios</h1>
      <div className="grid-2">
        <div className="card">
          <table>
            <thead><tr><th>Município</th><th>UF</th><th>População</th></tr></thead>
            <tbody>{municipios.map((m) => <tr key={m.id}><td>{m.nome}</td><td>{m.uf}</td><td>{fmtNumero(m.populacao)}</td></tr>)}</tbody>
          </table>
        </div>
        <form className="card" onSubmit={salvar}>
          <h2>Novo município</h2>
          <label>Nome<input required value={f.nome} onChange={set("nome")} /></label>
          <div className="linha">
            <label>UF<input required maxLength={2} value={f.uf} onChange={set("uf")} /></label>
            <label>População<input required type="number" min="0" value={f.populacao} onChange={set("populacao")} /></label>
          </div>
          <div className="linha">
            <label>Latitude<input required type="number" step="any" value={f.lat} onChange={set("lat")} /></label>
            <label>Longitude<input required type="number" step="any" value={f.lng} onChange={set("lng")} /></label>
          </div>
          {criterios.map((c) => (
            <label key={c.id}>{c.nome} ({c.unidade})
              <input required type="number" step="any" value={valores[c.id] ?? ""} onChange={(e) => setValores({ ...valores, [c.id]: e.target.value })} />
            </label>
          ))}
          <button type="submit">Cadastrar município</button>
        </form>
      </div>
    </>
  );
}
