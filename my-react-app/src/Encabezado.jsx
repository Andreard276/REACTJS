import miLogo from './assets/logo.png' ;
import facebook from './assets/facebook.png' ;
import instagram from './assets/instagram.png' ;
import linkedin from './assets/linkedin.png' ;
import whatsapp from './assets/whatsapp.png' ;
import tiktok from './assets/tik-tok.png' ;

function Encabezado() {
  return (
    <div>
        <Logo />
        <Menu />
        <Redes />

       <h2>Bienvenido a mi sitio</h2>
    </div>
  );
}
function Logo(){
    return (
        <div>
            <img src={miLogo} alt="React logo" />
        </div>
    );
}

function Menu(){
    return (
        <nav>
            <ul>
                <li>Inicio</li>
                <li>Acerca de</li>
                <li>Productos</li>
                <li>Contacto</li>
                <li>Sucursales</li>

            </ul>
        </nav>
    );

}

function Redes(){
    return (
        <div>
              <img src={facebook} alt="React facebbok" />
              <img src={instagram} alt="React instagram" />
            <img src={linkedin} alt="React linkedin" />
            <img src={whatsapp} alt="React whatsapp" />
            <img src={tiktok} alt="React tik-tok" />
        </div>
    );
}
export default Encabezado; 