import React, { useState, useEffect } from 'react';
import './usuarios.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/users');
        if (!response.ok) {
          throw new Error('Error al cargar los usuarios');
        }
        const data = await response.json();
        // Mapear los datos de la API a nuestro formato
        const usuariosFormateados = data.map(user => {
          const nombreCompleto = user.name || user.username || '';
          const partes = typeof nombreCompleto === 'string' ? nombreCompleto.split(' ') : [];
          return {
            id: user.id,
            nombre: partes[0] || user.username || 'Usuario',
            apellidos: partes.slice(1).join(' ') || '',
            direccion: user.address ? `${user.address.street || ''} ${user.address.city || ''}` : '',
            telefono: user.phone || '',
            correo: user.email || '',
            username: user.username || '',
            password: '***'
          };
        });
        setUsuarios(usuariosFormateados);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsuarios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEditar = (usuario) => {
    setEditingId(usuario.id);
    setEditData({ ...usuario });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleGuardar = () => {
    setUsuarios(usuarios.map(u => u.id === editingId ? editData : u));
    setEditingId(null);
    setEditData({});
  };

  const handleCancelar = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleEliminar = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    alert(`Usuario ${id} eliminado`);
  };

  if (loading) {
    return (
      <div className="usuarios-container">
        <h2>Usuarios Registrados</h2>
        <div className="loading">
          <p>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="usuarios-container">
        <h2>Usuarios Registrados</h2>
        <div className="error">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="usuarios-container">
      <h2>Usuarios Registrados</h2>
      <div className="tabla-wrapper">
        <table className="usuarios-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Username</th>
              <th>Password</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <React.Fragment key={usuario.id}>
                {editingId === usuario.id ? (
                  // Fila de edición
                  <tr className="edit-row">
                    <td>
                      <input
                        type="text"
                        name="nombre"
                        value={editData.nombre}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="apellidos"
                        value={editData.apellidos}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="direccion"
                        value={editData.direccion}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="telefono"
                        value={editData.telefono}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="correo"
                        value={editData.correo}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="username"
                        value={editData.username}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="password"
                        value={editData.password}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <button 
                        className="btn-guardar"
                        onClick={handleGuardar}
                      >
                        Guardar
                      </button>
                    </td>
                    <td>
                      <button 
                        className="btn-cancelar"
                        onClick={handleCancelar}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ) : (
                  // Fila normal
                  <tr>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellidos}</td>
                    <td>{usuario.direccion}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.password}</td>
                    <td>
                      <button 
                        className="btn-editar"
                        onClick={() => handleEditar(usuario)}
                      >
                        Editar
                      </button>
                    </td>
                    <td>
                      <button 
                        className="btn-eliminar"
                        onClick={() => handleEliminar(usuario.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;
