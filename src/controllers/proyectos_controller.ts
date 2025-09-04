import { Request, Response } from "express";
import { QueryResult } from "pg";
import pool from "../database/db_connect_pg";

export const getProyectos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result: QueryResult = await pool.query('SELECT * FROM proyectos ORDER BY id DESC;');
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message : "Internal Server Error", error});
    }
};

export const getProyectosById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const proyectoId = parseInt(req.params.id);
        const response: QueryResult = await pool.query(`SELECT * FROM proyectos WHERE id = ${proyectoId}`);
        return res.json(response.rows);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error});
    }
};

export const createProyecto = async (req: Request, res: Response): Promise<Response> => {
    const {id, nombre, fecha_inicio, fecha_fin} = req.body;

    if (id !== null && nombre !== null && fecha_inicio !== null && fecha_fin !== null) {
        try {
            await pool.query(
            'INSERT INTO proyectos (id, nombre, fecha_inicio, fecha_fin) values ($1, $2, $3, $4)',
            [id, nombre, fecha_inicio, fecha_fin]
        );
        return res.status(201).json({
            message: "Proyecto created successfully",
            proyecto: {
            id,
            nombre,
            fecha_inicio,
            fecha_fin
            }
        });
        } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
        }
    } else {
        return res.status(400).json({ message: "Bad Request" });
    }
};

export const deleteProyecto = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM proyectos WHERE id = $1', [id]);
        return res.status(200).json({ message: `El proyecto ${id} fue eliminado con éxito.` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
        }
};

export const updateProyecto = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { nombre, fecha_inicio, fecha_fin } = req.body;
    try {
        await pool.query('UPDATE proyectos SET nombre = $1, fecha_inicio = $2, fecha_fin = $3 WHERE id = $4', [nombre, fecha_inicio, fecha_fin, id]);
        return res.status(200).json({ message: `El proyecto ${id} fue actualizado con éxito.` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};