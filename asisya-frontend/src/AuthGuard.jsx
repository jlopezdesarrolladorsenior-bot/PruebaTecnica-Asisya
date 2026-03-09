import { Navigate } from 'react-router-dom';

export const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('token');
  // Si no hay token, redirige al login
  return token ? children : <Navigate to="/login" />;
};