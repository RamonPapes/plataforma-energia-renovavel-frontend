// Dados fictícios para desenvolver sem backend. Substitua pela API (VITE_USE_MOCK=false).
export const db = {
  criterios: [
    { id: 1, nome: "Domicílios sem energia elétrica", tipo: "C", peso: 0.35, unidade: "%" },
    { id: 2, nome: "População abaixo da linha de pobreza", tipo: "C", peso: 0.3, unidade: "%" },
    { id: 3, nome: "IDH municipal", tipo: "B", peso: 0.2, unidade: "índice" },
    { id: 4, nome: "Capacidade solar instalada", tipo: "B", peso: 0.15, unidade: "kW/1000 hab" },
  ],
  municipios: [
    { id: 1, nome: "Juazeiro", uf: "BA", populacao: 237000, lat: -9.41, lng: -40.5, valores: { 1: 2.1, 2: 31, 3: 0.68, 4: 14 } },
    { id: 2, nome: "Uauá", uf: "BA", populacao: 25000, lat: -9.83, lng: -39.48, valores: { 1: 6.4, 2: 52, 3: 0.59, 4: 4 } },
    { id: 3, nome: "Cametá", uf: "PA", populacao: 134000, lat: -2.24, lng: -49.5, valores: { 1: 9.8, 2: 58, 3: 0.58, 4: 1.5 } },
    { id: 4, nome: "Barcelos", uf: "AM", populacao: 27000, lat: -0.97, lng: -62.93, valores: { 1: 18.5, 2: 61, 3: 0.5, 4: 0.8 } },
    { id: 5, nome: "Jordão", uf: "AC", populacao: 8000, lat: -9.19, lng: -72.79, valores: { 1: 22.3, 2: 66, 3: 0.47, 4: 0.3 } },
    { id: 6, nome: "Araçuaí", uf: "MG", populacao: 37000, lat: -16.85, lng: -42.06, valores: { 1: 3.7, 2: 44, 3: 0.63, 4: 9 } },
    { id: 7, nome: "Chapecó", uf: "SC", populacao: 254000, lat: -27.1, lng: -52.61, valores: { 1: 0.3, 2: 8, 3: 0.79, 4: 31 } },
  ],
  simulacoes: [],
};
