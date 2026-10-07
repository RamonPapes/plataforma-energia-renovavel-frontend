import { USE_MOCK, request, wait } from "./api";
import { db } from "./mockData";

export async function listarCriterios() {
  if (!USE_MOCK) return request("/criterios");
  await wait();
  return db.criterios.map((c) => ({ ...c }));
}
export async function criarCriterio(dados) {
  if (!USE_MOCK) return request("/criterios", { method: "POST", body: JSON.stringify(dados) });
  await wait();
  const novo = { ...dados, id: Date.now() };
  db.criterios.push(novo);
  return novo;
}
export async function salvarPesos(criterios) {
  if (!USE_MOCK) return request("/criterios/pesos", { method: "PUT", body: JSON.stringify(criterios) });
  await wait();
  criterios.forEach((c) => Object.assign(db.criterios.find((x) => x.id === c.id) || {}, { peso: c.peso, tipo: c.tipo }));
  return criterios;
}
