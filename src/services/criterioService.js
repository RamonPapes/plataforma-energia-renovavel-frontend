import { USE_MOCK, request, wait } from "./api";
import { db } from "./mockData";
import { normalizarPesos } from "../utils/pesos";

// a API usa BENEFICIO/CUSTO; as telas usam B/C
const TIPOS_API = { B: "BENEFICIO", C: "CUSTO" };
const TIPOS_FRONT = { BENEFICIO: "B", CUSTO: "C" };
const daApi = (c) => ({ ...c, tipo: TIPOS_FRONT[c.tipo] });

export async function listarCriterios() {
  if (!USE_MOCK) return (await request("/criterios?limit=100")).data.map(daApi);
  await wait();
  return db.criterios.map((c) => ({ ...c }));
}
export async function criarCriterio({ peso, tipo, ...dados }) {
  // o peso não é enviado: a API redistribui os pesos automaticamente ao criar um critério
  if (!USE_MOCK) return daApi(await request("/criterios", { method: "POST", body: JSON.stringify({ ...dados, tipo: TIPOS_API[tipo] }) }));
  await wait();
  const novo = { ...dados, tipo, peso, id: Date.now() };
  db.criterios.push(novo);
  return novo;
}
export async function salvarPesos(criterios) {
  if (!USE_MOCK) {
    // o tipo é alterado critério a critério; os pesos, todos juntos (normalizados para somar 1)
    const salvos = await listarCriterios();
    for (const c of criterios) {
      const salvo = salvos.find((s) => s.id === c.id);
      if (salvo && salvo.tipo !== c.tipo) {
        await request(`/criterios/${c.id}`, { method: "PUT", body: JSON.stringify({ nome: c.nome, descricao: c.descricao, unidade: c.unidade, tipo: TIPOS_API[c.tipo] }) });
      }
    }
    return (await request("/criterios/pesos", { method: "PUT", body: JSON.stringify({ pesos: normalizarPesos(criterios) }) })).map(daApi);
  }
  await wait();
  criterios.forEach((c) => Object.assign(db.criterios.find((x) => x.id === c.id) || {}, { peso: c.peso, tipo: c.tipo }));
  return criterios;
}
