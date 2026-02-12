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
import './App.css';

function App(){
  const [currentPage, setCurrentPage] = useState('inicio');

  const menuItems = [
    { label: 'Inicio', href: 'inicio' },
    { label: 'Acerca de', href: 'acerca' },
    { label: 'Productos', href: 'productos' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Sucursales', href: 'sucursales' },
    { label: 'Galerias', href: 'galerias' }
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'inicio':
        return <Promociones />;
      case 'acerca':
        // keep promotions (or other content) below the top container
        return <Promociones />;
      case 'productos':
        return <div className="page-content"><h2>Productos</h2></div>;
      case 'contacto':
        return <div className="page-content"><h2>Contacto</h2></div>;
      case 'sucursales':
        return <div className="page-content"><h2>Sucursales</h2></div>;
      case 'galerias':
        return <div className="page-content"><h2>Galerías</h2></div>;
      default:
        return null;
    }
  };

  const topRef = useRef(null);

  useEffect(() => {
    // Scroll the top container into view when the page changes
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  return ( 
    <div className="app-container"> 
      <div className="app-content">
        <Encabezado menuItems={menuItems} onMenuClick={setCurrentPage} currentPage={currentPage} />
        <div ref={topRef} className="main-top">
          {currentPage === 'acerca' && <AcercaDe />}
          {currentPage === 'productos' && <Productos />}
          {currentPage === 'contacto' && <Contacto />}
          {currentPage === 'sucursales' && <Sucursales />}
          {currentPage === 'galerias' && <Galerias />}
          {currentPage === 'inicio' && <ContenedorTarjeta />}
          {/* fallback */}
          {!['acerca','productos','contacto','sucursales','galerias','inicio'].includes(currentPage) && <ContenedorTarjeta />}
        </div>
        {renderPage()}
      </div>
      <Pie />
    </div>
   
  ) 
}

function UserComponent(){
  
  const nombre = 'Andrea';
  const apellidos = 'Rodriguez Morales';
  const nombrecompleto = <h2>El nombre es: {nombre} y sus apellidos {apellidos}</h2>;
  return <h1>User Component {nombrecompleto}</h1>;
}

function ProfileComponent(){
  const users = [
    {id: 1, name: 'Andrea', role: 'Web Developer'},
    {id: 2, name: 'Diego', role: 'Web Designer'},
    {id: 3, name: 'Paola', role: 'Team Leader'},]
  return (
    <>
    <p>Lista de usuarios del sistema</p>
    <ul>
      {
      users.map (function(user,index) {
        return (
          <li key={index}>{user.name} es un {user.role}</li>
        )
      })
    }
    </ul>
    </>

  );
}

function FeedComponent(){
  const users=[
    {id:1, name:'pala', role:'Materiales de construcción'},
    {id:2, name:'martillo', role:'Herramientas de construcción'},
    {id:3, name:'cemento', role:'Materiales de construcción'},
    {id:4, name:'ladrillo', role:'Materiales de construcción'},
    {id:5, name:'nivel', role:'Herramientas de construcción'},
  ]
   return (
    <>
    <p>Lista de materiales del sistema</p>
    <ul>
      {
      users.map (function(user,index) {
        return (
          <li key={index}>{user.name} es un {user.role}</li>
        )
      })
    }
    </ul>
    </>

  );
}

 
  


export default App
