import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import __dirname from "./utils.js";
import config from "./config/config.js";
import apiCart from "./routes/cart.router.js";
import { logger } from "./middlewares/logger.js";
import apiProd from "./routes/product.router.js";
import viewsRouter from "./routes/views.rotuer.js";
import {userRouter} from "./routes/user.routes.js";
import mockingrouter from "./routes/mocking.routes.js";
import sessionsRouter from "./routes/sessions.router.js";
import initializeStrategy from "./config/passport.config.js";
import * as dotenv from "dotenv"
dotenv.config();
const app = express();
const PORT = 8080;
const USER_MONGO = process.env.USER_MONGO
const PASSWORD_MONGO = process.env.PASSWORD_MONGO
const DB_MONGO = process.env.DB_MONGO
const DB_URL = `mongodb+srv://${USER_MONGO}:${PASSWORD_MONGO}@cluster0.cmqpdge.mongodb.net/${DB_MONGO}?retryWrites=true&w=majority`
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
initializeStrategy();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use("/", viewsRouter);
app.use("/api/productos", apiProd);
app.use("/api/carrito", apiCart);
app.use("/api/sessions/", sessionsRouter);
app.use("/api/users", userRouter);
app.use("/api/mockingproducts", mockingrouter)
app.listen(PORT, () => { console.log(`Corriendo el servidor en el puerto${PORT}`) });
const environment = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(DB_URL, (err) => {
        if (err) {
            console.log('No se puede conectar a la base de datos')
        } else {
            console.log('Conectado a la base de datos')
        }
    })
}