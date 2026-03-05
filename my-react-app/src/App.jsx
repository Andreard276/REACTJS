import { useState, useEffect, useRef } from 'react';
import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./Encabezado";
import Pie from "./Pie";
import Promociones from "./Promociones";
import AcercaDe from "./AcercaDe";
import Productos from "./Productos";
import Contacto from "./Contacto";
import Sucursales from "./Sucursales";
import Galerias from "./Galerias";
import Usuarios from "./Usuarios";
import Carrito from "./Carrito";
import './App.css';
import './Login.css'; // Asegúrate de tener el archivo Login.css que te pasé antes

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, // La API usa 'username' en lugar de email
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login exitoso, Token:', data.token);
        alert('¡Bienvenido! Login exitoso.');
        // Aquí podrías guardar el token en localStorage o redireccionar
        localStorage.setItem('userToken', data.token);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Hubo un error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          
          <div className="form-group">
            <label>Nombre de Usuario</label>
            <input 
              type="text" 
              placeholder="ej: mor_2314" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="83r5^_" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>
        
        <div className="login-footer">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
}

function App(){
  const [currentPage, setCurrentPage] = useState('inicio');

  const menuItems = [
    { label: 'Inicio', href: 'inicio' },
    { label: 'Acerca de', href: 'acerca' },
    { label: 'Usuarios', href: 'usuarios' },
    { label: 'Productos', href: 'productos' },
    { label: 'Carrito', href: 'carrito' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Sucursales', href: 'sucursales' },
    { label: 'Galerias', href: 'galerias' },
    { label: 'Login', href: 'login'}
  ];

  const topRef = useRef(null);

  // Efecto para hacer scroll al inicio cada vez que cambias de pestaña
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  // Esta función decide qué componente principal mostrar
  const renderMainContent = () => {
    switch(currentPage) {
      case 'inicio': 
        return <ContenedorTarjeta />;
      case 'acerca': 
        return <AcercaDe />;
      case 'usuarios': 
        return <Usuarios />;
      case 'carrito': 
        return <Carrito />;
      case 'productos': 
        return <Productos />;
      case 'contacto': 
        return <Contacto />;
      case 'sucursales': 
        return <Sucursales />;
      case 'galerias': 
        return <Galerias />;
      case 'login': 
        return <LoginComponent />;
      default: 
        return <ContenedorTarjeta />;
    }
  };

  return ( 
    <div className="app-container"> 
      <div className="app-content">
        {/* ENCABEZADO */}
        <Encabezado 
          menuItems={menuItems} 
          onMenuClick={setCurrentPage} 
          currentPage={currentPage} 
        />
        
        {/* CONTENIDO PRINCIPAL (Aquí aparecerá el Login) */}
        <div ref={topRef} className="main-top">
          {renderMainContent()}
        </div>

        {/* CONTENIDO SECUNDARIO (Solo se muestra en ciertas páginas) */}
        {(currentPage === 'inicio' || currentPage === 'acerca') && (
          <Promociones />
        )}
      </div>

      {/* PIE DE PÁGINA */}
      <Pie />
    </div>
  );
}

export default App;