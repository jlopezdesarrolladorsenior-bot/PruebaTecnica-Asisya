import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductModal = ({ isOpen, onClose, productToEdit, onRefresh }) => {
  // IDs ACTUALIZADOS SEGÚN EL ÚLTIMO JSON DE SWAGGER
  const fixedCategories = [
    { id: 2, name: 'SERVIDORES' }, 
    { id: 3, name: 'CLOUD' }
  ];

  const [formData, setFormData] = useState({
    productId: 0,
    productName: '',
    categoryId: '' // Se guardará como 2 o 3
  });

  useEffect(() => {
    if (productToEdit && isOpen) {
      // 1. Extraer el nombre que viene del DTO del backend
      const currentCategoryName = productToEdit.categoryName || '';
      
      // 2. Mapeo SEGURO: Si el nombre es SERVIDORES es 2, si es CLOUD es 3.
      // Si es "Prueba Técnica Asisya", dejamos el select vacío para que el usuario elija.
      let correctId = '';
      if (currentCategoryName.toUpperCase() === 'SERVIDORES') correctId = 2;
      else if (currentCategoryName.toUpperCase() === 'CLOUD') correctId = 3;

      setFormData({
        productId: productToEdit.productId || 0,
        productName: productToEdit.productName || '',
        categoryId: correctId 
      });
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };

      // PAYLOAD CONVERTIDO A NÚMEROS (Importante para C#)
      const payload = {
        productId: parseInt(formData.productId),
        productName: formData.productName,
        categoryId: parseInt(formData.categoryId), // Enviará 2 o 3
        unitPrice: productToEdit?.unitPrice || 0,
        unitsInStock: productToEdit?.unitsInStock || 0
      };

      const url = `http://localhost:5000/api/products`;

      if (productToEdit) {        
        await axios.put(`${url}/${payload.productId}`, payload, config);
      } else {
        await axios.post(url, payload, config);
      }
      
      onRefresh(); 
      onClose();

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Guardado correctamente!',
        showConfirmButton: false,
        timer: 1500,
        toast: true 
        });
    } catch (error) {
      console.error("Error al guardar:", error.response);
      alert("Error al actualizar la categoría. Revisa la consola.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold">EDIT PRODUCT</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4 bg-light">
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">NAME</label>
                <input
                  type="text"
                  className="form-control border-0 shadow-sm"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">CATEGORY</label>
                <select 
                  className="form-select border-0 shadow-sm"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                >
                  <option value="">-- Choose New Category --</option>
                  {fixedCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                
                <div className="form-text mt-2 text-primary">
                  Current: {productToEdit?.categoryName}
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary px-4 shadow">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;