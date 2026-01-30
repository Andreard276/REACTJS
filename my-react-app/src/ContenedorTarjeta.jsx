import './ContenedorTarjeta.css';
import imgtarjeta from './assets/Paisaje_de_Albacete.jpg';
import logo from './assets/logo.png';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
function ContenedorTarjeta(){
    return(
        <div className="ContenedorTarjeta">
            <h2>Contenedor de Tarjetas </h2>
            <Tarjeta img={imgtarjeta} alt="Paisaje de Albacete" title="Tarjeta 1" desc="holalalalalal" />
            <Tarjeta img={logo} alt="Logo" title="Tarjeta 2" desc="byeeeee" />
            <Tarjeta img={facebook} alt="Facebook" title="Tarjeta 3" desc="hiii" />
            <Tarjeta img={instagram} alt="Instagram" title="Tarjeta 4" desc="goodbye" />
            </div>
    )        
}

function Tarjeta({img, alt, title, desc}){
    return(
        <div className="Tarjeta">
           <img src={img} alt={alt}/>
           <h3>{title}</h3>
           <p>{desc}</p>
           <a href="#">Leer más</a>
        </div>
    )
}
export default ContenedorTarjeta;