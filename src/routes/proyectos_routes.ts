import { Router } from "express";
import { createProyecto, deleteProyecto, getProyectos, getProyectosById, updateProyecto } from "../controllers/proyectos_controller";

const proyectosRutas = Router();

proyectosRutas.get('/proyectos', getProyectos);
proyectosRutas.get('/proyectos/:id', getProyectosById);
proyectosRutas.post('/createProyecto', createProyecto);
proyectosRutas.delete('/deleteProyecto/:id', deleteProyecto);
proyectosRutas.put('/updateProyecto/:id', updateProyecto);


export {proyectosRutas};