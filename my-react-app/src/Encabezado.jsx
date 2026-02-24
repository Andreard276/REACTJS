import React from 'react';
import miLogo from './assets/logouno.jpg' ;
import facebook from './assets/facebook.png' ;
import instagram from './assets/instagram.png' ;
import linkedin from './assets/linkedin.png' ;
import whatsapp from './assets/whatsapp.png' ;
import tiktok from './assets/tik-tok.png' ;
import './encabezado.css';

function Encabezado({ menuItems = defaultMenuItems, onMenuClick, currentPage }) {
  return (
    <div className="encabezado">
        <Logo />
        <Menu items={menuItems} onMenuClick={onMenuClick} currentPage={currentPage} />
        <div className="right-section">
            <Redes />
            <Clima />
        </div>
    </div>
  );
}

const defaultMenuItems = [
  { label: 'Inicio', href: 'inicio' },
  { label: 'Acerca de', href: 'acerca' },
  { label: 'Usuarios', href: 'usuarios' },
  { label: 'Productos', href: 'productos' },
  { label: 'Carrito', href: 'carrito' },
  { label: 'Contacto', href: 'contacto' },
  { label: 'Sucursales', href: 'sucursales' },
  { label: 'Galerias', href: 'galerias' }
  
  
];
function Logo(){
    return (
        <div className="logoDiv">
            <img src={miLogo} alt="React logo" />
        </div>
    );
}

function Menu({ items, onMenuClick, currentPage }){
    return (
        <div className="menuDiv">
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <button 
                            onClick={() => onMenuClick(item.href)}
                            className={currentPage === item.href ? 'active' : ''}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 'inherit',
                                color: currentPage === item.href ? '#007bff' : 'inherit',
                                fontWeight: currentPage === item.href ? 'bold' : 'normal'
                            }}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
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

function Clima(){
    const [clima, setClima] = React.useState('Cargando...');

    React.useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=20.1411&longitude=-97.2867&current=temperature_2m,weather_code,precipitation&temperature_unit=celsius')
            .then(response => response.json())
            .then(data => {
                const temp = data.current.temperature_2m;
                const weatherCode = data.current.weather_code;
                const description = getWeatherDescription(weatherCode);
                setClima(`Xicocotepec: ${temp}°C - ${description}`);
            })
            .catch(error => {
                console.log('Error al obtener clima:', error);
                setClima('Clima no disponible');
            });
    }, []);

    const getWeatherDescription = (code) => {
        const descriptions = {
            0: 'Despejado',
            1: 'Principalmente despejado',
            2: 'Parcialmente nublado',
            3: 'Nublado',
            45: 'Niebla',
            48: 'Niebla escarchada',
            51: 'Llovizna ligera',
            53: 'Llovizna moderada',
            55: 'Llovizna densa',
            61: 'Lluvia ligera',
            63: 'Lluvia moderada',
            65: 'Lluvia fuerte',
            71: 'Nieve ligera',
            73: 'Nieve moderada',
            75: 'Nieve fuerte',
            80: 'Chubascos ligeros',
            81: 'Chubascos moderados',
            82: 'Chubascos fuertes',
            85: 'Chubascos de nieve ligeros',
            86: 'Chubascos de nieve fuertes',
            95: 'Tormenta',
            96: 'Tormenta con granizo ligero',
            99: 'Tormenta con granizo fuerte'
        };
        return descriptions[code] || 'Desconocido';
    };

    return (
        <div className="clima-text">
            {clima}
        </div>
    );
}
export default Encabezado;