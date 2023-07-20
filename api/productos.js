import { listaProductos, crearProducto, eliminarProducto } from '../servicios/productos-servicios.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const productos = await listaProductos();
    res.status(200).json(productos);
  } else if (req.method === 'POST') {
    const { imageUrl, name, price, categoria, descripcion } = req.body;
    const nuevoProducto = await crearProducto(imageUrl, name, price, categoria, descripcion);
    res.status(201).json(nuevoProducto);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    await eliminarProducto(id);
    res.status(200).end();
  } else {
    res.status(405).end();
  }
}
