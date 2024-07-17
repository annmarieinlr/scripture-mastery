import * as mongodb from "mongodb";
import { Scripture } from "./scriptures";

export const collections: {
    scriptures?: mongodb.Collection<Scripture>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("scriptures");
    //await applySchemaValidation(db);

    const scripturesCollection = db.collection<Scripture>("scriptures");
    collections.scriptures = scripturesCollection;
}