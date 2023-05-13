const express = require('express');
const productsRouter = require('./products');
const cartsRouter = require('./carts');
const app = express();

const PORT = 8080;

app.use(express.json());

// Rutas para el endpoint /products
app.use('/api/products', productsRouter);

// Rutas para el endpoint /carts
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
