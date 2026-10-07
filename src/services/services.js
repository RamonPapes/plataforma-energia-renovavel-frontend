//montado pelo gemini, nao tenho certeza se eh o servico/API que usaremos

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Substitua pela URL do seu backend
});

// Interceptor para adicionar o token de autenticação (se houver)
api.interceptors.request.use(async config => {
  const token = localStorage.getItem('@Topsis:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;