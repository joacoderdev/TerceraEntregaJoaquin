import {faker} from "@faker-js/faker";
faker.locale = "es";

const generarMockProductos = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    code: faker.finance.creditCardCVV(),
    category: faker.commerce.productMaterial(),
    stock: faker.random.numeric(4),
    id: faker.database.mongodbObjectId(),
  };
};

export {generarMockProductos};
