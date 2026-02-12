import React from 'react';
import './sucursales.css';

const Sucursales = () => {
  return (
    <div className="sucursales-container">
      <h2>Sucursales</h2>
      <p>Encuentra nuestras sucursales y horarios de atención.</p>
      <div className="cards">
        <div className="card">
          <h3>Ciudad de México</h3>
          <p>Av. Reforma 123 — Lun a Vie: 9:00 - 18:00</p>
        </div>

        <div className="card">
          <h3>Nueva York</h3>
          <p>5th Avenue 456 — Mon to Fri: 9:00 - 17:00</p>
        </div>

        <div className="card">
          <h3>Japón</h3>
          <p>Chiyoda 1-1 — Lun-Vie: 10:00 - 19:00</p>
        </div>
      </div>
    </div>
  );
}

export default Sucursales;
