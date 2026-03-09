import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from './api'; 
import ProductModal from './components/ProductModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2000); 
  const [searchTerm, setSearchTerm] = useState(''); 

  
  const fetchProducts = async (page = 1, search = '') => {
    try {
      // URL con parámetros de página y búsqueda para el puerto 5000
      const urlCompleta = `http://localhost:5000/api/products?page=${page}&pageSize=50&search=${search}`;      
      const response = await api.get(urlCompleta);
      
      // Manejo flexible de la respuesta según el DTO del backend
      const data = response.data.items || response.data.data || response.data.products || response.data;
      setProducts(Array.isArray(data) ? data : []);
      
      // Actualización dinámica del total de páginas basado en el conteo filtrado
      if (response.data.total) {
        setTotalPages(Math.ceil(response.data.total / 50));
      } else if (response.data.totalPages) {
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error loading products", error);
      setProducts([]); 
    }
  };

  
  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545', 
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`http://localhost:5000/api/products/${productId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        fetchProducts(currentPage, searchTerm);
        
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'El producto ha sido borrado.',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
      }
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Header ASISYA */}
      <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center shadow">
        <div className="d-flex align-items-center">
          <h2 className="mb-0 fw-bold me-3">ASISYA</h2>
          <span className="text-secondary border-start ps-3">INVENTORY CONTROL SYSTEM</span>
        </div>
        <div className="text-end">
          <small className="text-secondary d-block">DATABASE RECORDS:</small>
          <span className="text-primary fw-bold h5">100,000</span>
        </div>
        <button className="btn btn-outline-danger btn-sm ms-3" onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}>Logout</button>
      </div>

      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Stock Control Panel</h3>
          
          {/* NUEVO: BARRA DE BÚSQUEDA INTEGRADA */}
          <div className="d-flex gap-2 w-50">
            <input 
              type="text" 
              className="form-control border-secondary-subtle" 
              placeholder="Search by description (e.g. Jeffer)..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Importante: volver a pág 1 al filtrar
              }}
            />
            <button className="btn btn-outline-dark text-nowrap" onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}>
              + New Product
            </button>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-secondary small">
                  <th className="ps-4">REFERENCE ID</th>
                  <th>DESCRIPTION</th>
                  <th>ASSIGNED CATEGORY</th>
                  <th className="text-center">MANAGEMENT</th>
                </tr>
              </thead>
              <tbody>                
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-5 text-muted">No products found matching your search.</td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.productId || p.ProductID}>
                      <td className="ps-4 text-secondary">{p.productId || p.ProductID}</td>
                      <td className="fw-bold text-dark">{p.productName || p.ProductName}</td>
                      <td>
                        <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-3">
                          {p.categoryName || 'SERVIDORES'}
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-sm text-secondary me-2" onClick={() => { setSelectedProduct(p); setIsModalOpen(true); }}>Edit</button>
                        <button className="btn btn-sm text-danger"  onClick={() => handleDelete(p.productId || p.ProductID)} > Delete  </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
          <button className="btn btn-light border" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
          <span className="text-muted">Page <b>{currentPage}</b> of <b>{totalPages || 1}</b></span>
          <button className="btn btn-light border" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productToEdit={selectedProduct}
        onRefresh={() => fetchProducts(currentPage, searchTerm)} 
      />
    </div>
  );
};

export default ProductList;