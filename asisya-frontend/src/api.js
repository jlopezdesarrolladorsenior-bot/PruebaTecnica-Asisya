import axios from 'axios';

const api = axios.create({
  
  baseURL: 'http://localhost:5000/api' 
});

// REQUISITO: Interceptor para agregar el token a cada request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); 
  console.log('prueba');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;