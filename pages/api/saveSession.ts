import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import shortUUID from "short-uuid";

let cachedDb: Db;

async function connectToDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.MONGODB_URI || "");

  const db = client.db(process.env.MONGODB_DBNAME);
  cachedDb = db;
  return db;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
  const id = shortUUID.generate();
  const data = {
    id: id,
    settings: req.body,
    date: new Date(),
  };

  try {
    const db = await connectToDatabase();
    const collection = db.collection("queries");

    await collection.insertOne(data);

    res.status(201).json({ message: "data added successfully", id: id });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error adding data", error: error.message });
  }
}
