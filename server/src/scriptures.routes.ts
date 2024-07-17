import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const scripturesRouter = express.Router();
scripturesRouter.use(express.json());

// GET /scriptures
scripturesRouter.get("/", async (req, res) => {
    try {
        const scriptures = await collections?.scriptures?.find({}).toArray();
        res.status(200).send(scriptures);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
    });

    // GET /scriptures/:id
scripturesRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const scripture = await collections?.scriptures?.findOne(query);

        if(scripture) {
            res.status(200).send(scripture);
        } else {
            res.status(404).send(`Scripture with id ${id} not found`);
        }
    } catch (error) {
        res.status(404).send('Failed to find scripture with ID ${req?.params?.id}');
    }
});

// POST /scriptures

scripturesRouter.post("/", async (req, res) => {
    try {
        const scripture = req?.body;
        const result = await collections?.scriptures?.insertOne(scripture);
        if (result?.acknowledged) {
            res.status(201).send(`Created a new scripture: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create scripture.");
        }
    } catch (error) {
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// PUT /scriptures/:id

scripturesRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const scripture = req?.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.scriptures?.updateOne(query, { $set: scripture });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated scripture with ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Scripture with ID ${id} not found.`);
        } else {
            res.status(304).send(`No changes were made to scripture with ID ${id}.`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

// DELETE /scriptures/:id

scripturesRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.scriptures?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Deleted scripture with ID ${id}.`);
        } else if (!result){
            res.status(400).send(`Failed to remove Scripture with ID ${id}.`);
        } else if (!result.deletedCount){
            res.status(404).send(`Scripture with ID ${id} not found.`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});