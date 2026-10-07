// TOPSIS (diagrama de atividades 4.4). Critério tipo "B" = benefício, "C" = custo.
// Como no roteiro e na API: Ci mais alto = MENOS vulnerável (1º lugar = menos vulnerável).
export function calcularTopsis(alternativas, criterios) {
  const soma = criterios.reduce((s, c) => s + Number(c.peso), 0) || 1;
  const valor = (a, c) => Number(a.valores?.[c.id] ?? 0);
  const norma = criterios.map((c) => Math.sqrt(alternativas.reduce((s, a) => s + valor(a, c) ** 2, 0)) || 1);
  const V = alternativas.map((a) => criterios.map((c, j) => (valor(a, c) / norma[j]) * (c.peso / soma)));
  const extremo = (j, max) => Math[max ? "max" : "min"](...V.map((r) => r[j]));
  const aPos = criterios.map((c, j) => extremo(j, c.tipo === "B"));
  const aNeg = criterios.map((c, j) => extremo(j, c.tipo !== "B"));
  const dist = (r, ref) => Math.sqrt(r.reduce((s, v, j) => s + (v - ref[j]) ** 2, 0));
  return alternativas
    .map((a, i) => {
      const dPos = dist(V[i], aPos);
      const dNeg = dist(V[i], aNeg);
      return { municipio_id: a.id, nome: a.nome, uf: a.uf, lat: a.lat, lng: a.lng, ci: dPos + dNeg === 0 ? 0 : dNeg / (dPos + dNeg) };
    })
    .sort((x, y) => y.ci - x.ci)
    .map((r, i) => ({ ...r, posicao: i + 1 }));
}
