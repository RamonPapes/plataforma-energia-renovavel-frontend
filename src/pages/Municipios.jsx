import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';

export default function Municipios() {
  const [municipios, setMunicipios] = useState([
    // Dados mockados baseados na imagem
    { id: 1, nome: 'Camaçari', uf: 'BA', populacao: '237.000' },
    { id: 2, nome: 'Xique-Xique', uf: 'BA', populacao: '25.000' },
    { id: 3, nome: 'Salvador', uf: 'BA', populacao: '134.000' },
  ]);

  // Exemplo de integração real:
  // useEffect(() => { api.get('/municipios').then(res => setMunicipios(res.data)); }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Municípios</h2>
      
      <div className="flex gap-6 items-start">
        {/* Tabela de Municípios */}
        <div className="flex-1 bg-white border border-gray-200 p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-600">
                <th className="pb-2 font-medium">Município</th>
                <th className="pb-2 font-medium">UF</th>
                <th className="pb-2 font-medium">População</th>
              </tr>
            </thead>
            <tbody>
              {municipios.map(m => (
                <tr key={m.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 text-sm">{m.nome}</td>
                  <td className="py-3 text-sm">{m.uf}</td>
                  <td className="py-3 text-sm">{m.populacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulário Novo Município */}
        <div className="flex-1 bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-bold mb-4">Novo município</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Nome</label>
              <input type="text" className="w-full border border-gray-300 p-2" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">UF</label>
                <input type="text" className="w-full border border-gray-300 p-2" />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">População</label>
                <input type="text" className="w-full border border-gray-300 p-2" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">Latitude</label>
                <input type="text" className="w-full border border-gray-300 p-2" />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Longitude</label>
                <input type="text" className="w-full border border-gray-300 p-2" />
              </div>
            </div>
            <hr className="my-4"/>
            <div>
              <label className="block text-sm mb-1">Domicílios sem energia elétrica (%)</label>
              <input type="text" className="w-full border border-gray-300 p-2" />
            </div>
            {/* Outros campos omitidos por brevidade... */}
            <button className="bg-[#2E7D32] text-white px-4 py-2 mt-4 font-medium">
              Cadastrar município
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}