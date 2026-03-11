import React from 'react';
// IMPORTANTE: Verifica que estas rutas de imágenes sean correctas en tu proyecto
import miLogo from './assets/logouno.jpg' ;
import facebook from './assets/facebook.png' ;
import instagram from './assets/instagram.png' ;
import linkedin from './assets/linkedin.png' ;
import whatsapp from './assets/whatsapp.png' ;
import tiktok from './assets/tik-tok.png' ;
import './encabezado.css';

// 1. Componente Principal: Recibe los items dinámicos desde App.jsx
function Encabezado({ menuItems, onMenuClick, currentPage }) {
  return (
    <div className="encabezado">
        <Logo />
        {/* Pasamos los items al componente Menu */}
        <Menu items={menuItems} onMenuClick={onMenuClick} currentPage={currentPage} />
        <div className="right-section">
            <Redes />
            <Clima />
        </div>
    </div>
  );
}

// 2. Componente Logo
function Logo(){
    return (
        <div className="logoDiv">
            <img src={miLogo} alt="Logo" />
        </div>
    );
}

// 3. Componente Menú: Mapea los items (Públicos o Privados)
function Menu({ items, onMenuClick, currentPage }){
    // Si por algún error items no llega, evitamos que la app truene con un array vacío
    const listaAMostrar = items || [];

    return (
        <div className="menuDiv">
            <ul>
                {listaAMostrar.map((item, index) => (
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
                                fontWeight: currentPage === item.href ? 'bold' : 'normal',
                                padding: '5px 10px'
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

// 4. Componente Redes Sociales
function Redes(){
    return (
        <div className= "redesDiv">
            <ul>
                <li><img src={facebook} alt="Facebook" /></li>
                <li><img src={instagram} alt="Instagram" /></li>
                <li><img src={linkedin} alt="Linkedin" /></li>
                <li><img src={whatsapp} alt="Whatsapp" /></li>
                <li><img src={tiktok} alt="Tiktok" /></li>
            </ul>
        </div>
    );
}

// 5. Componente Clima
function Clima(){
    const [clima, setClima] = React.useState('Cargando...');

    React.useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=20.1411&longitude=-97.2867&current=temperature_2m,weather_code&temperature_unit=celsius')
            .then(response => response.json())
            .then(data => {
                const temp = data.current.temperature_2m;
                const weatherCode = data.current.weather_code;
                const description = getWeatherDescription(weatherCode);
                setClima(`Xicotepec: ${temp}°C - ${description}`);
            })
            .catch(() => setClima('Clima no disponible'));
    }, []);

    const getWeatherDescription = (code) => {
        const descriptions = {
            0: 'Despejado', 1: 'Despejado', 2: 'Parcialmente nublado', 3: 'Nublado',
            45: 'Niebla', 61: 'Lluvia ligera', 63: 'Lluvia', 95: 'Tormenta'
        };
        return descriptions[code] || 'Desconocido';
    };

    return <div className="clima-text">{clima}</div>;
}

export default Encabezado;