// A API exige os pesos com no máximo 4 casas decimais e soma exatamente 1.
// Converte os pesos dos sliders (livres) em proporções que somam 1, pelo método do maior resto.
export function normalizarPesos(criterios) {
  const ESCALA = 10000;
  const soma = criterios.reduce((total, c) => total + Number(c.peso), 0);
  if (soma <= 0) throw new Error("Defina ao menos um critério com peso maior que zero.");

  const exatos = criterios.map((c) => (Number(c.peso) / soma) * ESCALA);
  const unidades = exatos.map(Math.floor);
  const sobra = ESCALA - unidades.reduce((total, u) => total + u, 0);
  exatos
    .map((exato, i) => ({ i, resto: exato - unidades[i] }))
    .sort((a, b) => b.resto - a.resto)
    .slice(0, sobra)
    .forEach(({ i }) => unidades[i]++);

  return criterios.map((c, i) => ({ id: c.id, peso: unidades[i] / ESCALA }));
}
