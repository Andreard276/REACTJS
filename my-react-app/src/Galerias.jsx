import React from 'react';
import './galerias.css';

const Galerias = () => {
  return (
    <div className="galerias-container">
      <h2>Galerías</h2>
      <p>Disfruta de nuestras fotos y proyectos recientes.</p>

      <div className="gallery-grid">
        <div className="gallery-card">
          <div className="gallery-image">
            <img src="https://via.placeholder.com/600x360?text=Foto+1" alt="Foto 1" />
          </div>
          <p>Proyecto reciente: sesión en exteriores.</p>
        </div>

        <div className="gallery-card">
          <div className="gallery-image">
            <img src="https://via.placeholder.com/600x360?text=Foto+2" alt="Foto 2" />
          </div>
          <p>Retrato editorial con luz natural.</p>
        </div>

        <div className="gallery-card">
          <div className="gallery-image">
            <img src="https://via.placeholder.com/600x360?text=Foto+3" alt="Foto 3" />
          </div>
          <p>Serie en estudio: blanco y negro.</p>
        </div>

        <div className="gallery-card">
          <div className="gallery-image">
            <img src="https://via.placeholder.com/600x360?text=Foto+4" alt="Foto 4" />
          </div>
          <p>Fotografía urbana y arquitectura.</p>
        </div>

        <div className="gallery-card">
          <div className="gallery-image">
            <img src="https://via.placeholder.com/600x360?text=Foto+5" alt="Foto 5" />
          </div>
          <p>Capturas de eventos y conciertos.</p>
        </div>
      </div>
    </div>
  );
}

export default Galerias;
