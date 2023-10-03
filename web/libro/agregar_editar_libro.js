import React, { useState, useEffect } from 'react';

function AgregarEditarLibro({ onAgregarEditar, libroActual, isEditing, onCancelar }) {
  const [libroForm, setLibroForm] = useState(libroActual);

  useEffect(() => {
    setLibroForm(libroActual);
  }, [libroActual]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibroForm({ ...libroForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregarEditar(libroForm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Título</label>
        <input type="text" className="form-control" name="titulo" value={libroForm.titulo} onChange={handleInputChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Autor</label>
        <input type="text" className="form-control" name="autor" value={libroForm.autor} onChange={handleInputChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea className="form-control" name="descripcion" value={libroForm.descripcion} onChange={handleInputChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Publicado</label>
        <input type="date" className="form-control" name="publicado" value={libroForm.publicado} onChange={handleInputChange} required />
      </div>
      <button type="submit" className="btn btn-primary me-2">{isEditing ? 'Actualizar' : 'Agregar'}</button>
      {isEditing && <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}

export default AgregarEditarLibro;
