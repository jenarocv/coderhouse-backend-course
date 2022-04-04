const { faker } = require("@faker-js/faker");

const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(
      (number = 1),
      (number = 1000),
      (number = 2),
      (string = "$")
    ),
    thumbnail: faker.image.food(
      (width = 50),
      (height = 50),
      (randomize = true)
    ),
  };
};

module.exports = { generateProduct };
