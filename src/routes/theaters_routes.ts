import { Router } from "express";
import { createTheater, deleteTheater, getTheaters, getTheatersById, updateTheater } from "../controllers/theaters_controller";
import { authenticateToken } from "../middlewares/users_middleware";

const theatersRouter = Router();

theatersRouter.get('/getTheaters', authenticateToken, getTheaters);
theatersRouter.get('/getTheatersById/:id', authenticateToken, getTheatersById);
theatersRouter.post('/createTheater', authenticateToken, createTheater);
theatersRouter.put('/updateTheater', authenticateToken, updateTheater);
theatersRouter.delete('/deleteTheater', authenticateToken, deleteTheater);


export {theatersRouter};