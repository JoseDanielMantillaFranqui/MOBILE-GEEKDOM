// GET
const listaProductos = () => {
    return fetch('https://api.jsonbin.io/v3/b/64b9a9918e4aa6225ec109ce')
      .then(response => response.json())
      .then(data => {
        return data.producto;
      })
      .catch(error => console.log(error));
  };
  
  // POST
  const crearProducto = (imageUrl, name, price, categoria, descripcion) => {
    const apiKey = '$2b$10$lYSCOVJ15vrKFZaC3enXSuuGWk1oRO7xStb2OpQ34Ykdw9RswQfQG'; // Reemplaza 'tu_llave_maestra' con tu propia llave maestra
    return fetch('https://api.jsonbin.io/v3/b/64b9a9918e4aa6225ec109ce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey
      },
      body: JSON.stringify({
        producto: [
          {
            imageUrl,
            price,
            name,
            categoria,
            descripcion
          }
        ]
      })
    })
      .then(response => response.json())
      .then(data => {
        return data.record.producto[0];
      })
      .catch(error => {
        console.log(error);
        throw new Error('No se pudo crear el producto');
      });
  };
  
  // DELETE
  const eliminarProducto = (id) => {
    const apiKey = '$2b$10$lYSCOVJ15vrKFZaC3enXSuuGWk1oRO7xStb2OpQ34Ykdw9RswQfQG'; // Reemplaza 'tu_llave_maestra' con tu propia llave maestra
    return fetch(`https://api.jsonbin.io/v3/b/64b9a9918e4aa6225ec109ce/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Master-Key': apiKey
      }
    })
      .then(respuesta => {
        if (respuesta.ok) {
          console.log('Producto eliminado en el servidor');
        } else {
          throw new Error('No se pudo eliminar el producto en el servidor');
        }
      })
      .catch(error => {
        console.log(error);
        throw new Error('Error al eliminar el producto');
      });
  };
  
  export const productoServicios = {
    listaProductos,
    crearProducto,
    eliminarProducto
  };
  