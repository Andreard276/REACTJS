import miLogo from './assets/logouno.jpg' ;
import facebook from './assets/facebook.png' ;
import instagram from './assets/instagram.png' ;
import linkedin from './assets/linkedin.png' ;
import whatsapp from './assets/whatsapp.png' ;
import tiktok from './assets/tik-tok.png' ;
import './encabezado.css';

function Encabezado() {
  return (
    <div className="encabezado">
        <Logo />
        <Menu />
        <div className="right-section">
            <h2></h2>
            <Redes />
        </div>
    </div>
  );
}
function Logo(){
    return (
        <div className="logoDiv">
            <img src={miLogo} alt="React logo" />
        </div>
    );
}

function Menu(){
    return (
        <div className="menuDiv">
            <ul>
                <li><a href='#'>Inicio</a></li>
                <li><a href='#'>Acerca de</a></li>
                <li><a href='#'>Productos</a></li>
                <li><a href='#'>Contacto</a></li>
                <li><a href='#'>Sucursales</a></li>
                <li><a href='#'>Galerias</a></li>
            </ul>
        </div>
    );

}

function Redes(){
    return (
        <div className= "redesDiv">
            <ul>
                <li><img src={facebook} alt="Facebook" /></li>
                <li><img src={instagram} alt="Instagram" /></li>
                <li><img src={linkedin} alt="Linkedin" /></li>
                <li><img src={whatsapp} alt="Whatsapp" /></li>
                <li><img src={tiktok} alt="Tiktok" />  
                </li>
            </ul>
        </div>
    );
}
export default Encabezado; 