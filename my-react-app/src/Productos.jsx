import React from 'react';
import './productos.css';
import tatuajesImg from './assets/tatuajes.jpg';

const Productos = () => {
  return (
    <div className="productos-container">
      <h2>Servicios</h2>
      <p>Explora nuestro catálogo de servicios destacados.</p>

      <div className="products-grid">
        <div className="product-card">
          <div className="card-image">
            <img src={tatuajesImg} alt="Tatuajes" />
          </div>
          <h3>Tatuajes</h3>
          <p>Diseños y artistas destacados.</p>
        </div>

        <div className="product-card">
          <div className="card-image">
            <img src="https://via.placeholder.com/400x240?text=Fotos" alt="Fotos" />
          </div>
          <h3>Fotos</h3>
          <p>Sesiones fotográficas y portafolios.</p>
        </div>

        <div className="product-card">
          <div className="card-image">
            <img src="/assets/moda.jpg" alt="Moda" />
          </div>
          <h3>Moda</h3>
          <p>Prendas y accesorios a la moda.</p>
        </div>

        <div className="product-card">
          <div className="card-image">
            <img src="https://via.placeholder.com/400x240?text=Perforaciones" alt="Perforaciones" />
          </div>
          <h3>Perforaciones</h3>
          <p>Studs, aros y servicios profesionales.</p>
        </div>
      </div>
    </div>
  );
}

export default Productos;
