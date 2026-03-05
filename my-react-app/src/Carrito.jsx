import React, { useState, useEffect } from 'react';
import './carrito.css';

function Carrito() {
  const [items, setItems] = useState([]);

  
  const cargarCarrito = () => {
    const guardados = JSON.parse(localStorage.getItem('carrito_items')) || [];
    setItems(guardados);
  };

  useEffect(() => {
    cargarCarrito();
    
    window.addEventListener('storage', cargarCarrito);
    return () => window.removeEventListener('storage', cargarCarrito);
  }, []);

  const eliminarDelCarrito = (tempId) => {
    const nuevo = items.filter(i => i.tempId !== tempId);
    setItems(nuevo);
    localStorage.setItem('carrito_items', JSON.stringify(nuevo));
  };

  return (
    <div className="carrito-container">
      <h2>Carrito de compras ({items.length})</h2>
      <div className="carritos-list">
        {items.length === 0 ? <p>El carrito está vacío</p> : 
          items.map((item) => (
            <div key={item.tempId} className="carrito-card">
               <img src={item.image} alt="" style={{width: '50px'}} />
               <h3>{item.title}</h3>
               <p>${item.price}</p>
               <button className="btn-delete" onClick={() => eliminarDelCarrito(item.tempId)}>QUITAR</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Carrito;