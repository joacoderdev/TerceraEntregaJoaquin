import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import __dirname from "./utils.js";
import config from "./config/config.js";
import apiCart from "./routes/cart.router.js";
import { logger } from "./logger.js"
import loggerRoutes from "./routes/loggerRoutes.js"
import apiProd from "./routes/product.router.js";
import viewsRouter from "./routes/views.rotuer.js";
import {userRouter} from "./routes/user.routes.js";
import mockingrouter from "./routes/mocking.routes.js";
import sessionsRouter from "./routes/sessions.router.js";
import initializeStrategy from "./config/passport.config.js";
import swaggerUiExpress from 'swagger-ui-express'
import * as dotenv from "dotenv"
import { serve, setup } from "swagger-ui-express";
// import specs from "./config/swagger.config.js";
import { swaggerSpecs } from "./config/swagger.config.js"
import swaggerUi from "swagger-ui-express"
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
app.get('/', (req, res) =>{
    // console.log("Ruta solicitada")
    // req.logger.info('Ruta Solicitada')
    // res.send({message:"Prueba de Logger"})
})
app.get("/login",(req,res)=>{
    req.logger.warn("Advertencia, el usuario no existe")
    res.send("Login autorizado");
})
app.use("/", viewsRouter);
app.use("/api/productos", apiProd);
app.get('/operacionsencilla', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i
    } 
    res.send({ sum });
})
app.get('/operacioncompleja', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 5e8; i++) {
        sum += i
    } 
    res.send({ sum });
})
app.use("/api/carrito", apiCart);
app.use("/api/sessions/", sessionsRouter);
app.use("/api/users", userRouter);
app.use("/api/mockingproducts", mockingrouter)
app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpecs));
app.listen(PORT, () => logger.info(colors.green(`Corriendo el servidor exitosamente en el puerto... ${PORT}`)))
const environment = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(DB_URL, (err) => {
        if (err) {
            logger.error(colors.red("Error...No se puede conectar a la base de datos..."));
        } else {
            logger.info(colors.green('Conectado exitosamente a la base de datos.'))
        }
    })
}

app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.url}`);
    next();
  });

  app.use("/api/loggerTest", loggerRoutes);

