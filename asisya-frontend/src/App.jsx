import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import ProductList from './ProductList';
import AuthGuard from './guards/AuthGuard';

function App() {
  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/login" element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route path="/products" element={<ProductList />} />          
        </Route>
        
        <Route path="/" element={<Navigate to="/products" replace />} />        
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;