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
import './Login.css'; 
import { AuthProvider, useAuth } from './AuthContext';

// --- COMPONENTE DE LOGIN ---
function LoginComponent({ onLoginSuccess }) {
  const { login } = useAuth();
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        onLoginSuccess('inicio');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
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
            <label>Usuario</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- CONTENIDO DE LA APP (Consumidor del Contexto) ---
function AppContent() {
  const { isLoggedIn, logout } = useAuth(); // Usamos isLoggedIn que es el nombre en tu AuthContext
  const [currentPage, setCurrentPage] = useState('inicio');
  const topRef = useRef(null);

  // Menú dinámico según el pizarrón
  const menuPublico = [
    { label: 'Inicio', href: 'inicio' },
    { label: 'Acerca de', href: 'acerca' },
    { label: 'Productos', href: 'productos' },
    { label: 'Galerías', href: 'galerias' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Sucursales', href: 'sucursales' },
    { label: 'Ingresar', href: 'login'}
  ];

  const menuPrivado = [
    { label: 'Inicio', href: 'inicio' },
    { label: 'Acerca de', href: 'acerca' },
    { label: 'Productos', href: 'productos' },
    { label: 'Galerías', href: 'galerias' },
    { label: 'Usuarios', href: 'usuarios' },
    { label: 'Carrito', href: 'carrito' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Sucursales', href: 'sucursales' },
    { label: 'Cerrar', href: 'logout'}
  ];

  const menuItems = isLoggedIn ? menuPrivado : menuPublico;

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const handleMenuClick = (dest) => {
    if (dest === 'logout') {
      logout();
      setCurrentPage('inicio');
    } else {
      setCurrentPage(dest);
    }
  };

  const renderMainContent = () => {
    switch(currentPage) {
      case 'inicio': return <ContenedorTarjeta />;
      case 'acerca': return <AcercaDe />;
      case 'usuarios': return <Usuarios />;
      case 'carrito': return <Carrito />;
      case 'productos': return <Productos />;
      case 'contacto': return <Contacto />;
      case 'sucursales': return <Sucursales />;
      case 'galerias': return <Galerias />;
      case 'login': return <LoginComponent onLoginSuccess={setCurrentPage} />;
      default: return <ContenedorTarjeta />;
    }
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <Encabezado 
          menuItems={menuItems} 
          onMenuClick={handleMenuClick} 
          currentPage={currentPage} 
        />
        <div ref={topRef} className="main-top">
          {renderMainContent()}
        </div>
        {(currentPage === 'inicio' || currentPage === 'acerca') && <Promociones />}
      </div>
      <Pie />
    </div>
  );
}

// --- COMPONENTE RAÍZ ---
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;