const asyncHandler = require("express-async-handler");

getAll = async () => {
  try {
    const content = await fs.promises.readFile(this.route, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    await fs.promises.writeFile(this.route, JSON.stringify([], null, 2));
    const content = await fs.promises.readFile(this.route, "utf-8");
    return JSON.parse(content);
  }
};

// getById = async (id) => {
//     try {
//         const products = await this.getAll();
//         const product = products.find((p) => p.id === parseInt(id));
//         return (
//             product || { error: `Product with id: ${id} does not exists` }
//         );
//     } catch (error) {
//         return error;
//     }
// };

getProductsById = async (id) => {
  try {
    const carts = await this.getAll();
    const cart = carts.findIndex((c) => c.id === parseInt(id));

    if (cart > -1) {
      const products = carts[cart].products;

      return products.length === 0
        ? `Cart with id: ${id} does not have any products`
        : products;
    } else {
      return { error: `Cart with id: ${id} does not exists` };
    }
  } catch (error) {
    return error;
  }
};

// getRandom = async () => {
//     const products = await this.getAll();
//     const random = products[Math.floor(Math.random() * products.length)];
//     return random;
// };

save = async () => {
  const cart = {
    timestamp: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
    products: [],
  };

  const carts = await this.getAll();

  if (carts.length === 0) {
    cart.id = 1;
  } else {
    const lastElement = carts[carts.length - 1];
    const lastId = lastElement.id + 1;
    cart.id = lastId;
  }

  carts.push(cart);

  try {
    await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2));
    return cart;
  } catch (error) {}
};

// deleteAll = async () => {
//     try {
//         await fs.promises.writeFile(
//             this.route,
//             JSON.stringify([], null, 2)
//         );
//     } catch (error) {}
// };

deleteById = async (id) => {
  const carts = await this.getAll();
  const elementToRemove = carts.findIndex((p) => p.id === parseInt(id));

  if (elementToRemove > -1) {
    carts.splice(elementToRemove, 1);

    try {
      await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2));
    } catch (error) {}
    return `Cart with id: ${id} has been deleted`;
  } else {
    return { error: `Cart with id: ${id} does not exists` };
  }
};

deleteProductByIdFromCart = async (cartId, productId) => {
  const carts = await this.getAll();
  const cart = carts.findIndex((c) => c.id === parseInt(cartId));

  if (cart > -1) {
    const products = carts[cart].products;

    const product = products.findIndex((p) => p.id === parseInt(productId));

    if (product > -1) {
      carts[cart].products.splice(product, 1);

      try {
        await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2));
      } catch (error) {}
      return `Product with id: ${productId} has been deleted`;
    } else {
      return {
        error: `Product with id: ${productId} does not exists`,
      };
    }
  } else {
    return { error: `Cart with id: ${cartId} does not exists` };
  }
};

saveProduct = async (id, product) => {
  const carts = await this.getAll();
  const cart = carts.findIndex((c) => c.id === parseInt(id));

  if (cart > -1) {
    const products = carts[cart].products;

    if (products.length === 0) {
      product.id = 1;
    } else {
      const lastElement = products[products.length - 1];
      const lastId = lastElement.id + 1;
      product.id = lastId;
    }

    product.timestamp = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");

    products.push(product);

    carts[cart].products = products;

    try {
      await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2));
    } catch (error) {}

    return carts[cart];
  } else {
    return { error: `Cart with id: ${id} does not exists` };
  }
};

module.exports = Cart;
