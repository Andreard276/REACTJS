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
import Categorias from "./Categorias"; // <--- IMPORTANTE: Crea este archivo
import './App.css';
import './Login.css'; 
import { AuthProvider, useAuth } from './AuthContext';

// --- COMPONENTE DE LOGIN ---
function LoginComponent({ onLoginSuccess, onNavigate }) {
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
          {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
          <div className="form-group">
            <label>Usuario</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Tu usuario"
              required 
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="********"
              required 
            />
          </div>
          
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Cargando...' : 'Entrar'}
          </button>

          <button 
            type="button" 
            className="btn-register" 
            onClick={() => onNavigate('usuarios')}
          >
            Nuevo Usuario
          </button>
        </form>
        <div className="login-footer">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
}

// --- CONTENIDO DE LA APP (Consumidor del Contexto) ---
function AppContent() {
  const { isLoggedIn, logout } = useAuth(); 
  const [currentPage, setCurrentPage] = useState('inicio');
  const topRef = useRef(null);

  // Menú para usuarios NO logueados
  const menuPublico = [
    { label: 'Inicio', href: 'inicio' },
    { label: 'Acerca de', href: 'acerca' },
    { label: 'Productos', href: 'productos' },
    { label: 'Galerías', href: 'galerias' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Sucursales', href: 'sucursales' },
    { label: 'Ingresar', href: 'login'}
  ];

  // Menú para usuarios logueados (Incluye Categoría)
  const menuPrivado = [
    { label: 'Inicio', href: 'inicio' },
    { label: 'Acerca de', href: 'acerca' },
    { label: 'Productos', href: 'productos' },
    { label: 'Categoría', href: 'categoria' }, // <--- NUEVA OPCIÓN
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
      case 'categoria': return <Categorias />; // <--- NUEVA PÁGINA
      case 'contacto': return <Contacto />;
      case 'sucursales': return <Sucursales />;
      case 'galerias': return <Galerias />;
      case 'login': return <LoginComponent onLoginSuccess={setCurrentPage} onNavigate={setCurrentPage} />;
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