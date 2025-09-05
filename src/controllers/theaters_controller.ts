import 'dotenv/config';
import { Request, Response } from 'express';
import { dbConnection } from '../database/db_connect_mongo';
import { ObjectId } from 'mongodb';

export const getTheaters = async (req: Request, res: Response): Promise<Response> => {
    try {
            const query = req.query;
            const collection = await dbConnection('theaters');
            const filteredDocs = await collection.find(query).toArray();    
            return res.status(200).json(filteredDocs);
        } catch (error) {
            return res.status(500).json({messge: `Error al buscar los documentos ${error}`});
        }
};

export const getTheatersById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const theaterId = req.params.id;
        const collection = await dbConnection('theaters');
        const document = await collection.findOne({_id : new ObjectId(theaterId)});    
        return res.status(200).json(document);
    } catch (error) {
        return res.status(500).json({messge: `Error al buscar el documento ${error}`});
    }
};

export const createTheater = async (req: Request, res: Response): Promise<Response> => {
    try {
        const theaterDocument = req.body;
        const collection = await dbConnection('theaters');
        const document = await collection.insertOne(theaterDocument);    
        return res.status(200).json(document);
    } catch (error) {
        return res.status(500).json({messge: `Error al insertar el documento ${error}`});
    }
};

export const updateTheater = async (req: Request, res: Response): Promise<Response> => {
    try {
        const query = req.query;
        const theaterDocument = req.body;
        const collection = await dbConnection('theaters');
        const document = await collection.updateOne(query, { $set: theaterDocument});    
        return res.status(200).json(document);
    } catch (error) {
        return res.status(500).json({messge: `Error al actualizar el documento ${error}`});
    }
};

export const deleteTheater = async (req: Request, res: Response): Promise<Response> => {
    try {
        const query = req.query;
        const collection = await dbConnection('theaters');
        const document = await collection.deleteOne(query);    
        return res.status(200).json(document);
    } catch (error) {
        return res.status(500).json({messge: `Error al eliminar el documento ${error}`});
    }
};