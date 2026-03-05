import { useState, useEffect } from 'react';
import './registrarProducto.css';

function RegistrarProducto({ onSave, productoEditando, cancelarEdicion }) {
    const [formData, setFormData] = useState({ title: '', price: '', description: '', image: '' });

    
    useEffect(() => {
        if (productoEditando) {
            setFormData(productoEditando);
        } else {
            setFormData({ title: '', price: '', description: '', image: '' });
        }
    }, [productoEditando]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const productoFinal = { ...formData, id: productoEditando ? productoEditando.id : Date.now() };
        onSave(productoFinal);
        setFormData({ title: '', price: '', description: '', image: '' });
    };

    return (
        <div className="registrar-box">
            <h2>{productoEditando ? "Editando Producto" : "Registrar Producto"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Titulo</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                <label>Precio</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                <label>Descripción</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                <label>Imagen</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} />
                
                <button type="submit">{productoEditando ? "Guardar Cambios" : "Registrar"}</button>
                {productoEditando && <button type="button" onClick={cancelarEdicion}>Cancelar</button>}
            </form>
        </div>
    );
}
export default RegistrarProducto;