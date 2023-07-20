//GET

const  listaProductos = () => {
   return fetch("https://mobile-geekdom.vercel.app/api/productos.js")
    .then(respuesta => respuesta.json())
    .catch(error => console.log(error))
}

//POST

const crearProducto = (imageUrl,name,price,categoria,descripcion) => {
    fetch("https://mobile-geekdom.vercel.app/api/productos.js", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            imageUrl,
            price,
            name,
            categoria,
            descripcion
        })
    }).then(respuesta => {
        if(respuesta.ok){
            return respuesta.body
        }
    }) 
    throw new Error("No se pudo crear el producto")
}  


const eliminarProducto = (id) => {
    return fetch(`https://mobile-geekdom.vercel.app/api/productos.js/${id}`, {
        method: "DELETE"
    })
        .then(respuesta => {
            if (respuesta.ok) {
                console.log("Producto eliminado en el servidor");
            } else {
                throw new Error("No se pudo eliminar el producto en el servidor");
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error("Error al eliminar el producto");
        });
};

export const productoServicios = {
    listaProductos,
    crearProducto,
    eliminarProducto
};