import { USE_MOCK, request, wait } from "./api";
import { db } from "./mockData";

// Ano de referência dos valores lançados pelo formulário (o front ainda não tem seletor de ano).
// O TOPSIS da API usa o ano mais recente com dados, então o município novo entra nesse mesmo ano;
// com a matriz vazia, usa o ano atual.
async function anoReferencia() {
  const [maisRecente] = await request("/matriz/anos");
  return maisRecente ?? new Date().getFullYear();
}

// a API usa latitude/longitude; as telas usam lat/lng
const daApi = (m) => ({ ...m, lat: m.latitude, lng: m.longitude });

export async function listarMunicipios() {
  if (!USE_MOCK) return (await request("/municipios?limit=500")).data.map(daApi);
  await wait();
  return [...db.municipios];
}
export async function criarMunicipio({ lat, lng, valores = {}, ...dados }) {
  if (!USE_MOCK) {
    const municipio = await request("/municipios", { method: "POST", body: JSON.stringify({ ...dados, latitude: lat, longitude: lng }) });
    // os valores dos indicadores ficam na matriz de decisão da API
    const lista = Object.entries(valores).map(([criterioId, valor]) => ({ municipioId: municipio.id, criterioId: Number(criterioId), valor }));
    if (lista.length) await request("/matriz", { method: "POST", body: JSON.stringify({ ano: await anoReferencia(), valores: lista }) });
    return daApi(municipio);
  }
  await wait();
  const novo = { ...dados, lat, lng, valores, id: Date.now() };
  db.municipios.push(novo);
  return novo;
}
