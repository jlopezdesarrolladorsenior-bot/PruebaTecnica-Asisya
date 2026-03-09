import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
    const token = localStorage.getItem('token');
    // Si no hay token, lo manda al login. Si hay, muestra el contenido (Outlet)
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;