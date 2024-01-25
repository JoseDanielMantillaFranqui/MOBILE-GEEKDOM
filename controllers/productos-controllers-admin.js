import { productoServicios } from "../servicios/productos-servicios.js";

const nuevoProducto = (name, imageUrl, price, id) => {
  const card = document.createElement('li');
  card.classList.add('productos__item');
  const contenido = `
    <img src="${imageUrl}" alt="Imagen Dispositivo" class="productos__item__img">
    <h2 class="productos__item__titulo">${name}</h2>
    <p class="productos__item__precio">${price}</p>
    <a href="./producto.html?id=${id}" class="productos__item__enlace">Ver producto</a>
    <div class="productos__item--botones">
      <a class="productos__item--botonEditar" href="editar-producto.html?id=${id}"><i class="icon-editar"></i></a>
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

const eliminarProducto = (id) => {

  // Procedemos a eliminar el producto sin especificar una versión
  fetch(`https://mobile-geekdom-api.onrender.com/producto/${id}`, {
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





const listaProductos = () => {
  productoServicios.obtenerListaProductos()
    .then(data => {
      mostrarProductos(data, productosTodos); // Mostrar todos los productos en el contenedor
    })
    .catch(error => console.log(error));
};

// Llamar a la función listaProductos para mostrar los productos al cargar la página
listaProductos();


const buscarProductos = (busqueda) => {
    if (busqueda.trim() === '') {
      listaProductos();
      return;
    }
  
    productoServicios.obtenerListaProductos()
      .then(data => {
        const productosEncontrados = data.filter(producto =>
          producto.name.toLowerCase().includes(busqueda.toLowerCase())
        );
  
        mostrarProductos(productosEncontrados, productosTodos);
      })
      .catch(error => console.log(error));
  };

const inputBusqueda = document.querySelector('.header__barraBusqueda--input');
inputBusqueda.addEventListener('input', (event) => {
  const textoBusqueda = event.target.value.trim();
  buscarProductos(textoBusqueda);
});

