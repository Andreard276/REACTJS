import './registrarProducto.css';
function RegistrarProducto() {
    return (
        <div>
            <h2>Registrar Producto</h2>
            <form>
                <label>Titulo</label>
                <input type="text" name="title" />
                <label>Precio</label>
                <input type="number" name="price" />
                <label>Descripción</label>
                <textarea name="description"></textarea>
                <label>Imagen</label>
                <input type="text" name="image" />
                <button type="submit">Registrar</button>
                

            </form>
            </div>
            
    )
}
export default RegistrarProducto;