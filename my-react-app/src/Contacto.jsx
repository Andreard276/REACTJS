import React from 'react';
import './contacto.css';

const Contacto = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    console.log('Contacto enviado:', values);
    alert('Gracias — hemos recibido tu mensaje.');
    e.target.reset();
  };
  return (
    <div className="contacto-container">
      <h2>Contacto</h2>
      <p>Puedes escribirnos o llamarnos.Teléfono y formulario de contacto aquí.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Nombre</span>
          <input type="text" name="nombre" placeholder="Tu nombre" required />
        </label>

        <label className="field">
          <span>Correo</span>
          <input type="email" name="correo" placeholder="tu@correo.com" required />
        </label>

        <label className="field">
          <span>Teléfono</span>
          <input type="tel" name="telefono" placeholder="+52 55 1234 5678" required />
        </label>

        <div className="actions">
          <button type="submit" className="btn">Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default Contacto;
