import { productoServicios } from "../servicios/productos-servicios.js";

const mostrarProducto = (name, imageUrl, price, descripcion) => {
    const contenedorProducto = document.querySelector("[data-producto]");
    const content = `
    <img src="${imageUrl}" alt="Imagen del producto" class="producto__imagen">
    <h1 class="producto__nombre">${name}</h1>
    <p class="producto__precio">${price}</p>
    <p class="producto__descripcion">${descripcion}</p>
    `;
    contenedorProducto.innerHTML = content;
    return contenedorProducto
}

const nuevoProducto = (name, imageUrl, price,id) => {
    const card = document.createElement('li');
    card.classList.add('productos__item');
    const contenido = `
      <img src="${imageUrl}" alt="Imagen Dispositivo" class="productos__item__img">
      <h2 class="productos__item__titulo">${name}</h2>
      <p class="productos__item__precio">${price}</p>
      <a href="./producto.html?id=${id}" class="productos__item__enlace">Ver producto</a>
    `;
    card.innerHTML = contenido;
    card.dataset.id = id;
    return card;
  };

const obtenerInformacion = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    productoServicios.detalleProducto(id).then((producto) => {
        const imageUrl = producto.imageUrl;
        const name = producto.name;
        const price = producto.price;
        const descripcion = producto.descripcion;

        mostrarProducto(name,imageUrl,price,descripcion)
    });
}

const barraLista = document.querySelector('[data-barra-lista]');

const mostrarProductos = (productos, contenedor) => {
    contenedor.innerHTML = ''; // Limpiar el contenido existente antes de mostrar los productos
  
    productos.forEach(producto => {
      const { name, imageUrl, price, id } = producto;
      const card = nuevoProducto(name, imageUrl, price, id);
      contenedor.appendChild(card);
    });
  };

const buscarProductos = (busqueda) => {
    if (busqueda.trim() === '') {
      barraLista.innerHTML = '';
      return;
    }
  
    productoServicios.obtenerListaProductos()
      .then(data => {
        const productosEncontrados = data.filter(producto =>
          producto.name.toLowerCase().includes(busqueda.toLowerCase())
        );
  
        mostrarProductos(productosEncontrados, barraLista);
      })
      .catch(error => console.log(error));
  };

const inputBusqueda = document.querySelector('.header__barraBusqueda--input');
inputBusqueda.addEventListener('input', (event) => {
  const textoBusqueda = event.target.value.trim();
  buscarProductos(textoBusqueda);
});

obtenerInformacion();