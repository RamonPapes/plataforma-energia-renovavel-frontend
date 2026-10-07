import { USE_MOCK, request, wait } from "./api";
import { db } from "./mockData";
import { calcularTopsis } from "../utils/topsis";
import { baixar } from "../utils/exportar";
import { listarMunicipios } from "./municipioService";
import { normalizarPesos } from "../utils/pesos";

// Converte a simulação da API para o formato das telas: ranking com nome/uf no mesmo nível
// e com as coordenadas do município (usadas pelo mapa)
function daApi(simulacao, municipiosPorId) {
  return {
    ...simulacao,
    ranking: simulacao.ranking.map((r) => {
      const municipio = municipiosPorId.get(r.municipio.id);
      return { ...r, municipio_id: r.municipio.id, nome: r.municipio.nome, uf: r.municipio.uf, lat: municipio?.lat, lng: municipio?.lng };
    }),
  };
}

async function municipiosPorId() {
  return new Map((await listarMunicipios()).map((m) => [m.id, m]));
}

export async function executarTopsis({ municipioIds, criterios }) {
  if (!USE_MOCK) {
    const corpo = { municipios: municipioIds, criterios: criterios.map((c) => c.id), pesos: normalizarPesos(criterios) };
    const simulacao = await request("/topsis/executar", { method: "POST", body: JSON.stringify(corpo) });
    return daApi(simulacao, await municipiosPorId());
  }
  await wait(400);
  const alternativas = db.municipios.filter((m) => municipioIds.includes(m.id));
  const sim = {
    id: db.simulacoes.length + 1,
    data_execucao: new Date().toISOString(),
    parametros: { criterios },
    ranking: calcularTopsis(alternativas, criterios),
  };
  db.simulacoes.unshift(sim);
  return sim;
}
export async function listarSimulacoes() {
  if (!USE_MOCK) {
    // a listagem da API traz só o resumo; as telas precisam do ranking de cada simulação
    const { data } = await request("/simulacoes?limit=20");
    const [detalhes, porId] = await Promise.all([Promise.all(data.map((s) => request(`/simulacoes/${s.id}`))), municipiosPorId()]);
    return detalhes.map((s) => daApi(s, porId));
  }
  await wait();
  return [...db.simulacoes];
}
export async function obterSimulacao(id) {
  if (!USE_MOCK) return daApi(await request(`/simulacoes/${id}`), await municipiosPorId());
  return db.simulacoes.find((s) => s.id === Number(id));
}
export async function exportarPdf(id) {
  if (USE_MOCK) return window.print();
  baixar(await request(`/relatorios/${id}/pdf`, { raw: true }), `relatorio-${id}.pdf`);
}
