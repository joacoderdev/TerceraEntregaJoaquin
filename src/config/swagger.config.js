import __dirname from "../utils.js";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Api de carrito y productos",
      description: "Proyecto coder backend API",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

// const specs = swaggerJSDoc(swaggerOptions);
// export default specs;
export const swaggerSpecs =swaggerJSDoc(swaggerOptions);