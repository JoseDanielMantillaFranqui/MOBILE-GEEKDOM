import { productoServicios } from "../servicios/productos-servicios.js";

const formulario = document.querySelector("[data-form]");

const obtenerInformacion =     () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const imageUrl = document.querySelector("[data-url]");
    const categoria = document.querySelector("[data-categoria]");
    const name = document.querySelector("[data-nombre]");
    const price = document.querySelector("[data-precio]");
    const descripcion = document.querySelector("[data-descripcion]");


    productoServicios.detalleProducto(id).then((producto) => {
        imageUrl.value = producto.imageUrl;
        categoria.value = producto.categoria;
        name.value = producto.name;
        price.value = producto.price;
        descripcion.value = producto.descripcion;
    });
}

obtenerInformacion();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const imageUrl = document.querySelector("[data-url]").value;
    const categoria = document.querySelector("[data-categoria]").value;
    const name = document.querySelector("[data-nombre]").value;
    const price = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    productoServicios.actualizarProducto(imageUrl,price,name,categoria,descripcion,id).then(() => {window.location.href="productos-admin.html"})
})