import express from "express";
import { empleadosRutas } from "./routes/empleados_routes.js";
import { proyectosRutas } from "./routes/proyectos_routes.js";
import { moviesRouter } from "./routes/movies_routes.js";
import { theatersRouter } from "./routes/theaters_routes.js";
import { userRouter } from "./routes/users_routes.js";
import { errorHandler } from "./middlewares/error_middleware.js";

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Middleware para procesar datos 'application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: true}));

app.use(errorHandler);

app.use('/api', empleadosRutas);
app.use('/api', proyectosRutas);
app.use('/api', moviesRouter);
app.use('/api', theatersRouter);
app.use('/api', userRouter);


app.listen(port, () => {
    return console.log(`Estoy corriendo en el puerto ${port}`);
});