const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = this.loadProductsFromFile();
  }

  loadProductsFromFile() {
    try {
      const fileData = fs.readFileSync('products.json', 'utf8');
      return JSON.parse(fileData);
    } catch (error) {
      console.error('Error reading products file:', error);
      return [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
        { id: '3', name: 'Product 3' },
        { id: '4', name: 'Product 4' },
        { id: '5', name: 'Product 5' },
      ];
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }
}

module.exports = ProductManager;
