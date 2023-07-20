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
  return fetch('https://api.jsonbin.io/v3/b/64b9a9918e4aa6225ec109ce')
    .then(response => response.json())
    .then(data => {
      return data.record.producto;
    })
    .catch(error => console.log(error));
};

const eliminarProducto = (id) => {
  fetch(`https://api.jsonbin.io/v3/b/64b9a9918e4aa6225ec109ce/producto/${id}`, {
    method: 'DELETE'
  })
    .then(respuesta => {
      if (respuesta.ok) {
        console.log('Producto eliminado correctamente');
      } else {
        console.log('Error al eliminar el producto');
      }
    })
    .catch(error => console.log(error));
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
