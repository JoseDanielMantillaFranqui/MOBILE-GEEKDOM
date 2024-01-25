// GET
const obtenerListaProductos = () => {
    return fetch('https://mobile-geekdom-api.onrender.com/producto')
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
  };
  
  const crearProducto = (imageUrl, name, price, categoria, descripcion) => {
    return fetch(`https://mobile-geekdom-api.onrender.com/producto`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" // Corrige la escritura de "Content-Type"
      },
      body: JSON.stringify({
        imageUrl,
        price,
        name,
        categoria,
        descripcion
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parsea la respuesta JSON
      } else {
        throw new Error('No se pudo crear el producto'); // Lanza un error si la respuesta no es exitosa
      }
    })
    .catch(error => {
      console.log(error);
      throw new Error('No se pudo crear el producto');
    });
  };
  
  
  // DELETE
  const eliminarProducto = (id) => {
    return fetch(`https://mobile-geekdom-api.onrender.com/producto/${id}`, {
      method: 'DELETE'
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

  //PUT

  const detalleProducto = (id) => {
    return fetch(`https://mobile-geekdom-api.onrender.com/producto/${id}`).then((respuesta) => respuesta.json());
  }

  const actualizarProducto = (imageUrl,price,name,categoria,descripcion,id) => {
    return fetch(`https://mobile-geekdom-api.onrender.com/producto/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageUrl,
        price,
        name,
        categoria,
        descripcion
      })
    })
    .then(respuesta => respuesta)
    .catch((err) => console.log(err))
  }
  
  export const productoServicios = {
    obtenerListaProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto
  };
  