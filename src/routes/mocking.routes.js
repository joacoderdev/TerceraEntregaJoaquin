import { Router } from "express";
import { generarMockProductos } from "../mockutils.js";

const router = Router();

router.get("/", (req, res) => {
  let products = [];
  const cant = req.query.cant || 100;
  for (let i = 0; i < cant; i++) {
    const newUser = generarMockProductos();
    products.push(newUser);
  }
  res.json({ products });
});

export default router;