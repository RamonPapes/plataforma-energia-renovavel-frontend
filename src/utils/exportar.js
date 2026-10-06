import { fmtCi } from "./formatadores";

export function exportarCSV(ranking, nomeArquivo = "ranking-topsis") {
  const linhas = [["Posição", "Município", "UF", "Coeficiente de proximidade"], ...ranking.map((r) => [r.posicao, r.nome, r.uf, fmtCi(r.ci)])];
  const csv = linhas.map((l) => l.join(";")).join("\n");
  baixar(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }), `${nomeArquivo}.csv`);
}

export function baixar(blob, nome) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = nome;
  a.click();
  URL.revokeObjectURL(a.href);
}
