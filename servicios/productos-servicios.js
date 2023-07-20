// GET
const listaProductos = () => {
    return fetch('https://api.jsonbin.io/v3/b/64b9a9918e4aa6225ec109ce')
      .then(response => response.json())
      .then(data => {
        return data.record.producto;
      })
      .catch(error => console.log(error));
  };
  
  // POST
  const crearProducto = (imageUrl, name, price, categoria, descripcion) => {
    return fetch('https://api.jsonbin.io/v3/b/64b9a9918e4aa6225ec109ce', {
      method: 'POST',
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
    return fetch(`https://api.jsonbin.io/v3/b/64b9a9918e4aa6225ec109ce`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        const producto = data.record.producto.find(item => item.id === id);
        if (!producto) {
          throw new Error('Producto no encontrado');
        }
  
        return fetch(`https://api.jsonbin.io/v3/b/64b9a9918e4aa6225ec109ce/${producto.id}`, {
          method: 'DELETE'
        });
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
  