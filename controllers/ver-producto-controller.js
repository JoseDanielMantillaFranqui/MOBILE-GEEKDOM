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

obtenerInformacion();