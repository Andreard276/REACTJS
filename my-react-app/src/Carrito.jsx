import React, { useState, useEffect } from 'react';
import './carrito.css';

function Carrito() {
  const [carritos, setCarritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarritos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/carts');
        if (!response.ok) {
          throw new Error('Error al cargar los carritos');
        }
        const data = await response.json();
        setCarritos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCarritos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCarritos();
  }, []);

  if (loading) {
    return (
      <div className="carrito-container">
        <h2>Carrito de compras</h2>
        <div className="loading">
          <p>Cargando carritos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="carrito-container">
        <h2>Carrito de compras</h2>
        <div className="error">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2>Carrito de compras</h2>
      <div className="carritos-list">
        {carritos.map((carrito) => (
          <div key={carrito.id} className="carrito-card">
            <div className="carrito-id">
              <h3>{carrito.id}</h3>
            </div>
            
            <div className="carrito-fecha">
              <span>{carrito.date}</span>
            </div>

            <div className="carrito-productos">
              <p className="productos-title">Productos</p>
              <ul>
                {carrito.products.map((producto, index) => (
                 <li key={index} className="producto-item">
                  <span>Producto #{producto.productId} - Cantidad {producto.quantity}</span>
                  <button className="btn-remove-item" title="Quitar producto">&times;</button>
             </li>
              ))}
              </ul>
            </div>

            <div className="carrito-action">
              <button className="btn-comprar">Comprar</button>
              <button className="btn-delete">ELIMINAR</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carrito;
