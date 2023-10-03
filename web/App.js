import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AgregarEditarLibro from './libro/agregar_editar_libro'; // Asegúrate de ajustar la ruta de importación según tu estructura de archivos

function App() {
  const [libros, setLibros] = useState([]);
  const [libroActual, setLibroActual] = useState({ titulo: '', autor: '', descripcion: '', publicado: '' });
  const [isEditing, setIsEditing] = useState(false);

  const API_URL = 'http://localhost:3000/api/libros';

  useEffect(() => {
    fetchLibros();
  }, []);

  const fetchLibros = async () => {
    try {
      const response = await axios.get(API_URL);
      setLibros(response.data);
    } catch (error) {
      console.error('Error fetching libros:', error);
    }
  };

  const handleAgregarEditarLibro = async (libro) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${libro.id}`, libro);
      } else {
        await axios.post(API_URL, libro);
      }
      fetchLibros();
      setLibroActual({ titulo: '', autor: '', descripcion: '', publicado: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding or updating libro:', error);
    }
  };

  const handleEditLibro = (libro) => {
    setLibroActual(libro);
    setIsEditing(true);
  };

  const handleDeleteLibro = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchLibros();
    } catch (error) {
      console.error('Error deleting libro:', error);
    }
  };

  const handleCancelar = () => {
    setLibroActual({ titulo: '', autor: '', descripcion: '', publicado: '' });
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1 className="my-4">Librería</h1>
      <AgregarEditarLibro 
        onAgregarEditar={handleAgregarEditarLibro} 
        libroActual={libroActual} 
        isEditing={isEditing} 
        onCancelar={handleCancelar} 
      />
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="table-primary">
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Descripción</th>
              <th>Publicado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro, index) => (
              <tr key={libro.id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                <td>{libro.id}</td>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.descripcion}</td>
                <td>{libro.publicado}</td>
                <td>
                  <button onClick={() => handleEditLibro(libro)} className="btn btn-warning btn-sm me-2">Editar</button>
                  <button onClick={() => handleDeleteLibro(libro.id)} className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}

export default App;

