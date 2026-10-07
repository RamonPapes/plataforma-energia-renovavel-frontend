import React from 'react';
import Layout from '../components/Layout';

export default function Criterios() {
  const criterios = [
    { nome: 'Domicílios sem energia elétrica (%)', tipo: 'Benefício', peso: 0.20 },
    { nome: 'População abaixo da linha de pobreza (%)', tipo: 'Benefício', peso: 0.20 },
    { nome: 'IDH municipal (índice)', tipo: 'Custo', peso: 0.20 },
    { nome: 'Capacidade solar instalada (kW/1000 hab)', tipo: 'Custo', peso: 0.20 },
  ];

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-2">Critérios e pesos</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Benefício (B): quanto maior o valor, maior a vulnerabilidade. Custo (C): quanto maior o valor, menor a vulnerabilidade. Os pesos são normalizados no cálculo.
      </p>

      <div className="bg-white border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-12 gap-4 pb-2 border-b text-sm font-medium text-gray-600">
          <div className="col-span-6">Critério</div>
          <div className="col-span-3">Tipo</div>
          <div className="col-span-3">Peso</div>
        </div>
        
        {criterios.map((crit, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100 last:border-0">
            <div className="col-span-6 text-sm text-gray-800">{crit.nome}</div>
            <div className="col-span-3">
              <select className="border border-gray-300 p-1 bg-white text-sm" defaultValue={crit.tipo}>
                <option>Benefício</option>
                <option>Custo</option>
              </select>
            </div>
            <div className="col-span-3 flex items-center gap-4">
              <input type="range" min="0" max="1" step="0.01" defaultValue={crit.peso} className="w-24 accent-blue-600" />
              <span className="text-sm">{crit.peso.toFixed(2)}</span>
            </div>
          </div>
        ))}
        
        <button className="bg-[#2E7D32] text-white px-4 py-2 mt-6 font-medium">
          Salvar pesos
        </button>
      </div>

      <div className="bg-white border border-gray-200 p-6 flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm mb-1">Novo critério</label>
          <input type="text" className="w-full border border-gray-300 p-2" />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Unidade</label>
          <input type="text" className="w-full border border-gray-300 p-2" />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Tipo</label>
          <select className="w-full border border-gray-300 p-2 bg-white">
            <option>Benefício</option>
            <option>Custo</option>
          </select>
        </div>
        <button className="bg-[#2E7D32] text-white px-4 py-2 font-medium">
          Adicionar critério
        </button>
      </div>
    </Layout>
  );
}