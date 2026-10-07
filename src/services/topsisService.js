import { USE_MOCK, request, wait } from "./api";
import { db } from "./mockData";
import { calcularTopsis } from "../utils/topsis";
import { baixar } from "../utils/exportar";

export async function executarTopsis({ municipioIds, criterios }) {
  if (!USE_MOCK) return request("/topsis/executar", { method: "POST", body: JSON.stringify({ municipioIds, criterios }) });
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
  if (!USE_MOCK) return request("/simulacoes");
  await wait();
  return [...db.simulacoes];
}
export async function obterSimulacao(id) {
  if (!USE_MOCK) return request(`/simulacoes/${id}`);
  return db.simulacoes.find((s) => s.id === Number(id));
}
export async function exportarPdf(id) {
  if (USE_MOCK) return window.print();
  baixar(await request(`/relatorios/${id}/pdf`, { raw: true }), `relatorio-${id}.pdf`);
}
