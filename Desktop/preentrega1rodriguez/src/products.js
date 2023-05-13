const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const productsFilePath = './products.json';

// Obtener todos los productos
router.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath));
  res.send(products);
});

// Obtener un producto por su id
router.get('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath));
  const product = products.find(p => p.id == req.params.pid);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ error: 'Producto no encontrado' });
  }
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath));
  const newProduct = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails
  };
  products.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  res.send(newProduct);
});

// Actualizar un producto por su id
router.put('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath));
  const productIndex = products.findIndex(p => p.id == req.params.pid);
  if (productIndex != -1) {
    products[productIndex] = {
      ...products[productIndex],
      title: req.body.title || products[productIndex].title,
      description: req.body.description || products[productIndex].description,
      code: req.body.code || products[productIndex].code,
      price: req.body.price || products[productIndex].price,
      status: req.body.status || products[productIndex].status,
      stock: req.body.stock || products[productIndex].stock,
      category: req.body.category || products[productIndex].category,
      thumbnails: req.body.thumbnails || products[productIndex].thumbnails
    };
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.send(products[productIndex]);
  } else {
    res.status(404).send({ error: 'Producto no encontrado' });
  }
});

// Eliminar un producto por su id
router.delete('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath));
  const productIndex = products.findIndex(p => p.id == req.params.pid);
  if (productIndex != -1) {
    const deletedProduct = products.splice(productIndex, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.send(deletedProduct[0]);
  } else {
    res.status(404).send({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
