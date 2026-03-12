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
import { useAuth } from './AuthContext';

// 1. Modificamos LoginComponent para que reciba 'onNavigate' como prop
function LoginComponent({ onNavigate }) {
  const { login } = useAuth(); 

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="ejemplo@correo.com" required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="********" required />
          </div>
          
          <button type="submit" className="btn-login">
            Entrar
          </button>

          {/* 2. Cambiamos a type="button" para que no envíe el formulario 
                 y le asignamos la función para navegar a 'usuarios' */}
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

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

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
      // 3. Pasamos la función setCurrentPage al componente de Login
      case 'login': return <LoginComponent onNavigate={setCurrentPage} />; 
      default: return <ContenedorTarjeta />;
    }
  };

  return ( 
    <div className="app-container"> 
      <div className="app-content">
        <Encabezado 
          menuItems={menuItems} 
          onMenuClick={setCurrentPage} 
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

export default App;