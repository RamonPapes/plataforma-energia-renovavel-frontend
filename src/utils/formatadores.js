export const fmtNumero = (n) => (n == null ? "—" : Number(n).toLocaleString("pt-BR"));
export const fmtCi = (n) => Number(n).toFixed(3).replace(".", ",");
export const fmtDia = (iso) => new Date(iso).toLocaleDateString("pt-BR");
export const fmtData = (iso) => new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
// Cor por faixa de vulnerabilidade, as mesmas faixas da API (roteiro: Ci maior = MENOS vulnerável):
// vermelho (muito alta), laranja (alta), amarelo (média), verde (baixa)
export function corCi(ci) {
  if (ci < 0.25) return "#C0392B";
  if (ci < 0.5) return "#D35400";
  if (ci < 0.75) return "#C98A00";
  return "#3E8E41";
}
