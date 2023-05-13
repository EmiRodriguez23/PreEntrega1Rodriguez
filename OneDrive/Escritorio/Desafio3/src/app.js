const express = require('express');
const ProductManager = require('./src/ProductManager');

const app = express();
const productManager = new ProductManager();

app.get('/products', (req, res) => {
  const limit = req.query.limit;

  if (limit) {
    const limitedProducts = productManager.getProducts().slice(0, limit);
    res.json({ products: limitedProducts });
  } else {
    const allProducts = productManager.getProducts();
    res.json({ products: allProducts });
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.get('/list-products', (req, res) => {
  const allProducts = productManager.getProducts();
  let productList = '';

  allProducts.forEach((product) => {
    productList += `${product.id}: ${product.name}\n`;
  });

  res.send(`Product List:\n${productList}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
