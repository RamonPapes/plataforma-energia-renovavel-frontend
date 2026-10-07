import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticação com a API iria aqui
    navigate('/municipios');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 border border-gray-200 shadow-sm w-96">
        <h2 className="text-2xl font-bold mb-6">Entrar</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">E-mail</label>
            <input type="email" className="w-full border border-gray-300 p-2 outline-none focus:border-green-700" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Senha</label>
            <input type="password" className="w-full border border-gray-300 p-2 outline-none focus:border-green-700" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Perfil</label>
            <select className="w-full border border-gray-300 p-2 outline-none focus:border-green-700">
              <option>Pesquisador</option>
              <option>Administrador</option>
              <option>Gestor Público</option>
            </select>
          </div>
          <button type="submit" className="bg-[#2E7D32] hover:bg-green-800 text-white px-6 py-2 mt-2 font-medium">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}