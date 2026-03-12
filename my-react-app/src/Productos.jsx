import { useEffect, useState } from 'react';
import api from './Services/api';
import './productos.css';
import RegistrarProducto from './registrarProducto'; 
import { useAuth } from './AuthContext'; // Importamos el contexto de autenticación

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [productoAEditar, setProductoAEditar] = useState(null); 
  
  // Obtenemos el estado isLoggedIn del contexto
  const { isLoggedIn } = useAuth(); 

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const guardados = JSON.parse(localStorage.getItem('mis_productos'));
        
        if (guardados && guardados.length > 0) {
          setProductos(guardados);
        } else {
          const response = await api.get('/products');
          setProductos(response.data);
          localStorage.setItem('mis_productos', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);

  const actualizarLista = (nuevoProd) => {
    let nuevaLista;
    if (productoAEditar) {
      nuevaLista = productos.map(p => p.id === nuevoProd.id ? nuevoProd : p);
    } else {
      nuevaLista = [nuevoProd, ...productos];
    }
    setProductos(nuevaLista);
    localStorage.setItem('mis_productos', JSON.stringify(nuevaLista));
    setProductoAEditar(null);
  };

  const eliminarProducto = (id) => {
    const nuevaLista = productos.filter(p => p.id !== id);
    setProductos(nuevaLista);
    localStorage.setItem('mis_productos', JSON.stringify(nuevaLista));
  };

  const agregarAlCarrito = (prod) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito_items')) || [];
    const nuevoCarrito = [...carritoActual, { ...prod, tempId: Date.now() }];
    localStorage.setItem('carrito_items', JSON.stringify(nuevoCarrito));
    alert(`${prod.title} añadido al carrito`);
    window.dispatchEvent(new Event('storage')); 
  };

  if (cargando) return <p>Cargando productos...</p>;

  return (
    <div className="productos-container">
      {/* 1. Condicional para mostrar el formulario solo si está logeado */}
      {isLoggedIn && (
        <RegistrarProducto 
          onSave={actualizarLista} 
          productoEditando={productoAEditar}
          cancelarEdicion={() => setProductoAEditar(null)}
        />
      )}

      <h2>Catálogo de Productos</h2>
      <div className="products-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="product-card">
            <div className="card-image">
              <img src={producto.image} alt={producto.title} />
            </div>
            <h3 className="product-title">{producto.title}</h3>
            <p className="product-price">${producto.price}</p>
            
            {/* 2. Condicional para mostrar los botones de acción solo si está logeado */}
            {isLoggedIn && (
              <div className="product-actions-group">
                <button className="btn-add-cart" onClick={() => agregarAlCarrito(producto)}>AGREGAR AL CARRITO</button>
                <button className="btn-edit" onClick={() => setProductoAEditar(producto)}>EDITAR</button>
                <button className="btn-delete" onClick={() => eliminarProducto(producto.id)}>ELIMINAR</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;