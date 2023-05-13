const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const cartsFilePath = './carts.json';

// Crear un nuevo carrito
router.post('/', (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFilePath));
  const newCart = {
    id: uuidv4(),
    products: []
  };
  carts.push(newCart);
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
  res.send(newCart);
});

// Listar los productos de un carrito por su id
router.get('/:cid', (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFilePath));
  const cart = carts.find(c => c.id == req.params.cid);
  if (cart) {
    res.send(cart.products);
  } else {
    res.status(404).send({ error: 'Carrito no encontrado' });
  }
});

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFilePath));
  const cartIndex = carts.findIndex(c => c.id == req.params.cid);
  if (cartIndex != -1) {
    const cart = carts[cartIndex];
    const existingProduct = cart.products.find(p => p.id == req.params.pid);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({
        product: req.params.pid,
        quantity: 1
      });
    }
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.send(cart.products);
  } else {
    res.status(404).send({ error: 'Carrito no encontrado' });
  }
});

module.exports = router;
