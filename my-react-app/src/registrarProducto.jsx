import { useState, useEffect } from 'react';
import './registrarProducto.css';

function RegistrarProducto({ productoEditando, cancelarEdicion }) {
    const [formData, setFormData] = useState({ title: '', price: '', description: '', image: '', category: 'electronic' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (productoEditando) {
            setFormData(productoEditando);
        } else {
            setFormData({ title: '', price: '', description: '', image: '', category: 'electronic' });
        }
    }, [productoEditando]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = productoEditando 
            ? `https://fakestoreapi.com/products/${productoEditando.id}` 
            : 'https://fakestoreapi.com/products';
        
        const metodo = productoEditando ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: metodo,
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            
            // Simulación de éxito
            console.log(`Producto ${productoEditando ? 'actualizado' : 'creado'} en la API:`, data);
            alert(`Éxito: El producto "${data.title}" fue enviado a la API correctamente.`);
            
            // Limpiar formulario si no es edición
            if (!productoEditando) {
                setFormData({ title: '', price: '', description: '', image: '', category: 'electronic' });
            }
        } catch (error) {
            console.error("Error al procesar el producto:", error);
            alert("Error al conectar con la API.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registrar-box">
            <h2>{productoEditando ? "Editando" : "Registrar Producto"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Título</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                
                <label>Precio</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                
                <label>Descripción</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                
                <label>URL de Imagen</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://link-de-la-imagen.com" />
                
                <div className="button-group">
                    <button type="submit" className="btn-save" disabled={loading}>
                        {loading ? "Procesando..." : (productoEditando ? "Actualizar" : "Enviar")}
                    </button>
                    {productoEditando && (
                        <button type="button" className="btn-cancel" onClick={cancelarEdicion}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default RegistrarProducto;