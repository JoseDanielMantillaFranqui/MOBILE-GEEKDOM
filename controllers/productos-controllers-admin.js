const nuevoProducto = (name, imageUrl, price, id) => {
  const card = document.createElement('li');
  card.classList.add('productos__item');
  const contenido = `
    <img src="${imageUrl}" alt="Imagen Dispositivo" class="productos__item__img">
    <h2 class="productos__item__titulo">${name}</h2>
    <p class="productos__item__precio">${price}</p>
    <a href="${id}" class="productos__item__enlace">Ver producto</a>
    <div class="productos__item--botones">
      <i class="icon-editar"></i>
      <i class="icon-eliminar"></i>
    </div>
  `;
  card.innerHTML = contenido;
  card.dataset.id = id;
  return card;
};

const productosTodos = document.querySelector('[data-product-todos]');

const mostrarProductos = (productos, contenedor) => {
  contenedor.innerHTML = ''; // Limpiar el contenido existente antes de mostrar los productos

  productos.forEach(producto => {
    const { name, imageUrl, price, id } = producto;
    const card = nuevoProducto(name, imageUrl, price, id);

    // Agregar evento de clic al botón de eliminar
    const botonEliminar = card.querySelector('.icon-eliminar');
    botonEliminar.addEventListener('click', () => {
      eliminarProducto(id); // Llamar a la función para eliminar el producto
      card.remove(); // Eliminar el elemento de la lista en el DOM
    });

    contenedor.appendChild(card);
  });
};

const obtenerProductos = () => {
  // Obtener una referencia a la base de datos de Firebase
  const database = firebase.database();
  // Obtener una referencia a la ubicación de los productos en la base de datos
  const productosRef = database.ref('productos');

  // Obtener los datos de la ubicación 'productos'
  return productosRef.once('value')
    .then(snapshot => {
      // Convertir el resultado en un array de productos
      const data = snapshot.val();
      const productos = Object.values(data);
      return productos;
    })
    .catch(error => console.log(error));
};

const eliminarProducto = (id) => {

  // Obtener una referencia al producto que se quiere eliminar
  const database = firebase.database();
  const productoRef = database.ref(`productos/${id}`);

  // Eliminar el producto utilizando el método remove() de Firebase Realtime Database
  return productoRef.remove()
    .then(() => {
      console.log('Producto eliminado en el servidor');
    })
    .catch(error => {
      console.log(error);
      throw new Error('Error al eliminar el producto');
    });
};

const listaProductos = () => {
  obtenerProductos()
    .then(data => {
      mostrarProductos(data, productosTodos); // Mostrar todos los productos en el contenedor
    })
    .catch(error => console.log(error));
};

// Llamar a la función listaProductos para mostrar los productos al cargar la página
listaProductos();
