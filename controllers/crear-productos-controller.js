import { productoServicios } from "../servicios/productos-servicios.js";

const form = document.querySelector('[data-form]');
var productosTodos = document.querySelector('[data-product-todos]');

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = document.querySelector('[data-url]').value;
    const nombre = document.querySelector('[data-nombre]').value;
    const precio = document.querySelector('[data-precio]').value;
    const categoria = document.querySelector('[data-categoria]').value; // Obtener la categoría seleccionada
    const descripcion = document.querySelector('[data-descripcion]').value

    productoServicios.crearProducto(url, nombre, precio, categoria, descripcion)
        .then(respuesta => {
            window.location.href = "index.html";
            console.log(respuesta);
        }).catch(error => {
            console.log(error);
        });
});

productosTodos.addEventListener("click", (event) => {
    if (event.target.classList.contains("icon-eliminar")) {
        const card = event.target.closest(".productos__item");
        const id = card.dataset.id;

        productoServicios.eliminarProducto(id)
            .then(() => {
                card.remove();
                console.log("Producto eliminado");
            })
            .catch(error => {
                console.log(error);
            });
    }
});
