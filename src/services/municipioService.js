import { USE_MOCK, request, wait } from "./api";
import { db } from "./mockData";

export async function listarMunicipios() {
  if (!USE_MOCK) return request("/municipios");
  await wait();
  return [...db.municipios];
}
export async function criarMunicipio(dados) {
  if (!USE_MOCK) return request("/municipios", { method: "POST", body: JSON.stringify(dados) });
  await wait();
  const novo = { ...dados, id: Date.now() };
  db.municipios.push(novo);
  return novo;
}
