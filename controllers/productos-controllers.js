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

const productosGamaBaja = document.querySelector('[data-product-gamaBaja]');
const productosGamaMedia = document.querySelector('[data-product-gamaMedia]');
const productosGamaAlta = document.querySelector('[data-product-gamaAlta]');
const barraLista = document.querySelector('[data-barra-lista]');
const cargando = document.querySelectorAll('.loading');


const mostrarProductos = (productos, contenedor) => {
  contenedor.innerHTML = ''; // Limpiar el contenido existente antes de mostrar los productos

  productos.forEach(producto => {
    const { name, imageUrl, price, id } = producto;
    const card = nuevoProducto(name, imageUrl, price, id);
    contenedor.appendChild(card);
  });
};

const obtenerProductos = () => {
  return fetch('https://mobile-geekdom-api.onrender.com/producto')
    .then(response => response.json())
    .then(data => {
      cargando.forEach(function(elemento) {
        elemento.style.display = 'none'
      })
      return data;
    })
    .catch(error => console.log(error));
};

const listaProductos = () => {
  obtenerProductos()
    .then(data => {
      const gamaBajaProductos = data.filter(producto => producto.categoria === 'gamaBaja');
      const gamaMediaProductos = data.filter(producto => producto.categoria === 'gamaMedia');
      const gamaAltaProductos = data.filter(producto => producto.categoria === 'gamaAlta');

      mostrarProductos(gamaBajaProductos, productosGamaBaja); // Mostrar productos de Gama Baja
      mostrarProductos(gamaMediaProductos, productosGamaMedia); // Mostrar productos de Gama Media
      mostrarProductos(gamaAltaProductos, productosGamaAlta); // Mostrar productos de Gama Alta
    })
    .catch(error => console.log(error));
};

const buscarProductos = (busqueda) => {
  if (busqueda.trim() === '') {
    barraLista.innerHTML = '';
    return;
  }

  obtenerProductos()
    .then(data => {
      const productosEncontrados = data.filter(producto =>
        producto.name.toLowerCase().includes(busqueda.toLowerCase())
      );

      mostrarProductos(productosEncontrados, barraLista);
    })
    .catch(error => console.log(error));
};

// Agregar evento "input" al input para búsqueda en tiempo real
const inputBusqueda = document.querySelector('.header__barraBusqueda--input');
inputBusqueda.addEventListener('input', (event) => {
  const textoBusqueda = event.target.value.trim();
  buscarProductos(textoBusqueda);
});

// Agregar evento "blur" al input para limpiar el contenido del contenedor "barraLista"
inputBusqueda.addEventListener('blur', () => {
  setTimeout(() => {
    barraLista.innerHTML = '';
    barraLista.style.display = 'none';
  }, 200);
});

// Llamar a la función listaProductos para mostrar los productos al cargar la página
listaProductos();
