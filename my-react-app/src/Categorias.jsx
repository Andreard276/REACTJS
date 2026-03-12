import React, { useEffect, useState } from 'react';

function Categorias() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => res.json())
            .then(data => {
                setCategories(data.categories);
                setLoading(false);
            });
    }, []);

    if (loading) return <p style={{textAlign: 'center', padding: '50px', fontSize: '20px'}}>Cargando el menú de categorías...</p>;

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            {/* Texto de introducción de categorías */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '10px' }}>Nuestras Categorías Gastronómicas</h1>
                <p style={{ color: '#666', fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>
                    Explora nuestra amplia variedad de platillos seleccionados cuidadosamente. 
                    Desde carnes premium hasta opciones vegetarianas, tenemos algo especial para cada paladar.
                </p>
            </div>

            {/* Cuadrícula de productos */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '30px' 
            }}>
                {categories.map(cat => (
                    <div key={cat.idCategory} style={{
                        border: 'none',
                        borderRadius: '15px',
                        padding: '20px',
                        textAlign: 'center',
                        background: '#fff',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
                        transition: 'transform 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <img 
                            src={cat.strCategoryThumb} 
                            alt={cat.strCategory} 
                            style={{ width: '100%', maxWidth: '200px', borderRadius: '10px', marginBottom: '15px' }} 
                        />
                        
                        {/* Nombre del Producto */}
                        <h3 style={{ 
                            margin: '10px 0', 
                            color: '#007bff', 
                            fontSize: '22px',
                            textTransform: 'uppercase'
                        }}>
                            {cat.strCategory}
                        </h3>

                        {/* Descripción del Producto */}
                        <p style={{ 
                            fontSize: '14px', 
                            color: '#555', 
                            lineHeight: '1.5',
                            margin: '0',
                            textAlign: 'justify'
                        }}>
                            {cat.strCategoryDescription.substring(0, 120)}...
                        </p>
                        
                        <button style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}>
                            Ver Recetas
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categorias;