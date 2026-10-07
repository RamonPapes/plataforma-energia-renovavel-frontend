import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  const navItems = [
    { name: 'Painel', path: '/painel' },
    { name: 'Municípios', path: '/municipios' },
    { name: 'Critérios', path: '/criterios' },
    { name: 'TOPSIS', path: '/topsis' },
    { name: 'Simulações', path: '/simulacoes' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Navbar baseada nos protótipos */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-lg font-bold">Energia Renovável</h1>
          <nav className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`pb-4 -mb-4 px-2 text-sm ${
                  location.pathname.startsWith(item.path)
                    ? 'border-b-2 border-green-700 text-green-800 font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="text-sm text-gray-500 flex items-center space-x-2">
          <span>yasmin (Pesquisador)</span>
          <Link to="/login" className="text-green-700 hover:underline">Sair</Link>
        </div>
      </header>

      {/* Conteúdo da Página */}
      <main className="p-8 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}