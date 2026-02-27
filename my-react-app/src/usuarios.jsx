import React, { useState, useEffect } from 'react';
import './usuarios.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  
  // NUEVO: Estado para el formulario de registro
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '', apellidos: '', direccion: '', telefono: '', correo: '', username: '', password: ''
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/users');
        if (!response.ok) throw new Error('Error al cargar los usuarios');
        const data = await response.json();
        const formateados = data.map(user => ({
          id: user.id,
          nombre: user.name?.firstname || user.username,
          apellidos: user.name?.lastname || '',
          direccion: user.address ? `${user.address.street} ${user.address.city}` : '',
          telefono: user.phone || '',
          correo: user.email || '',
          username: user.username || '',
          password: user.password || '***'
        }));
        setUsuarios(formateados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  // Funciones de Lógica
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleNuevoChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    const idNuevo = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    setUsuarios([{ ...nuevoUsuario, id: idNuevo }, ...usuarios]);
    setNuevoUsuario({ nombre: '', apellidos: '', direccion: '', telefono: '', correo: '', username: '', password: '' });
    alert("Usuario registrado con éxito");
  };

  const handleGuardar = () => {
    setUsuarios(usuarios.map(u => u.id === editingId ? editData : u));
    setEditingId(null);
  };

  const handleEliminar = (id) => {
    if(window.confirm("¿Eliminar usuario?")) setUsuarios(usuarios.filter(u => u.id !== id));
  };

  if (loading) return <div className="usuarios-container"><div className="loading"><p>Cargando...</p></div></div>;

  return (
    <div className="usuarios-container">
      <h2>Gestión de Usuarios</h2>

      {/* --- FORMULARIO PARA NUEVO USUARIO --- */}
      <div className="form-registro">
        <h3>Registrar Nuevo Usuario</h3>
        <form onSubmit={handleAgregar} className="nuevo-usuario-grid">
          <input type="text" name="nombre" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={handleNuevoChange} required />
          <input type="text" name="apellidos" placeholder="Apellidos" value={nuevoUsuario.apellidos} onChange={handleNuevoChange} />
          <input type="text" name="direccion" placeholder="Dirección" value={nuevoUsuario.direccion} onChange={handleNuevoChange} />
          <input type="text" name="telefono" placeholder="Teléfono" value={nuevoUsuario.telefono} onChange={handleNuevoChange} />
          <input type="email" name="correo" placeholder="Correo" value={nuevoUsuario.correo} onChange={handleNuevoChange} required />
          <input type="text" name="username" placeholder="Username" value={nuevoUsuario.username} onChange={handleNuevoChange} />
          <input type="password" name="password" placeholder="Password" value={nuevoUsuario.password} onChange={handleNuevoChange} required />
          <button type="submit" className="btn-guardar">REGISTRAR USUARIO</button>
        </form>
      </div>

      {/* --- TABLA DE USUARIOS --- */}
      <div className="tabla-wrapper">
        <table className="usuarios-tabla">
          <thead>
            <tr>
              <th>Nombre</th><th>Apellidos</th><th>Dirección</th><th>Teléfono</th>
              <th>Correo</th><th>Username</th><th>Password</th><th>Editar</th><th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <React.Fragment key={usuario.id}>
                {editingId === usuario.id ? (
                  <tr className="edit-row">
                    <td><input type="text" name="nombre" value={editData.nombre} onChange={handleInputChange} className="edit-input" /></td>
                    <td><input type="text" name="apellidos" value={editData.apellidos} onChange={handleInputChange} className="edit-input" /></td>
                    <td><input type="text" name="direccion" value={editData.direccion} onChange={handleInputChange} className="edit-input" /></td>
                    <td><input type="text" name="telefono" value={editData.telefono} onChange={handleInputChange} className="edit-input" /></td>
                    <td><input type="email" name="correo" value={editData.correo} onChange={handleInputChange} className="edit-input" /></td>
                    <td><input type="text" name="username" value={editData.username} onChange={handleInputChange} className="edit-input" /></td>
                    <td><input type="text" name="password" value={editData.password} onChange={handleInputChange} className="edit-input" /></td>
                    <td><button className="btn-guardar" onClick={handleGuardar}>Guardar</button></td>
                    <td><button className="btn-cancelar" onClick={() => setEditingId(null)}>X</button></td>
                  </tr>
                ) : (
                  <tr>
                    <td>{usuario.nombre}</td><td>{usuario.apellidos}</td><td>{usuario.direccion}</td><td>{usuario.telefono}</td>
                    <td>{usuario.correo}</td><td>{usuario.username}</td><td>{usuario.password}</td>
                    <td><button className="btn-editar" onClick={() => {setEditingId(usuario.id); setEditData(usuario);}}>Editar</button></td>
                    <td><button className="btn-eliminar" onClick={() => handleEliminar(usuario.id)}>Eliminar</button></td>
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
