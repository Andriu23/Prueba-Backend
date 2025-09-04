import 'dotenv/config'
import { MongoClient } from 'mongodb';

// Connection URL
const url:string = `mongodb+srv://sandresksc_db_user:${process.env.LOCAL_MONGODB_PASSWORD}@proyectosena.utw9r13.mongodb.net/?retryWrites=true&w=majority&appName=ProyectoSENA`
const client = new MongoClient(url);

export const dbconnection = async (dbName: string, collectionToFind: string) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionToFind);
    const filteredDocs = await collection.find({ title: "A Corner in Wheat" }).toArray();
    return filteredDocs;
};