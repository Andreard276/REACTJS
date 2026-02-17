import './promociones.css';
import Mapa from './MAPA';

function Promociones() {
  return (
    <section className="promociones">
      <div className="promociones-content">
        <h2>Saruino Design RM</h2>
        <p>Saruino Design RM es una empresa que busca capturar el arte de lo cotidiano atraves de tradiciones, fotografia, videos, musica, tatuajes, hobbies y moda.</p>
        <Mapa lat={19.4326} lng={-99.1332} nombre_sucursal="Paseo de la Reforma, CDMX" />
      </div>
    </section>
  );
}

export default Promociones;
