import React, { useEffect, useState } from 'react';
import api from './Services/api';
import './productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await api.get('/products');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) return <p>Cargando productos...</p>;

  return (
    <div className="productos-container">
      <h2>Catálogo de Productos</h2>
      <p>Explora nuestros artículos destacados.</p>

      <div className="products-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="product-card">
            <div className="card-image">
              <img src={producto.image} alt={producto.title} />
            </div>
            <h3 className="product-title">{producto.title}</h3>
            <p className="product-price">${producto.price}</p>
            <p className="product-desc">{producto.description?.slice(0, 80)}{producto.description && producto.description.length > 80 ? '...' : ''}</p>
            <button className="product-cta">Ver producto</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
