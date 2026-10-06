export const fmtNumero = (n) => Number(n).toLocaleString("pt-BR");
export const fmtCi = (n) => Number(n).toFixed(3).replace(".", ",");
export const fmtData = (iso) => new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
// Vulnerabilidade:
export function corCi(ci) {
  if (ci >= 0.66) return "#C0392B"; // alta
  if (ci >= 0.4) return "#C98A00"; // média
  return "#3E8E41"; // baixa
}
