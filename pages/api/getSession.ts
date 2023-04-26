import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

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
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("sessions");

    const result = await collection.findOne({ id: id });

    res.status(201).json(result?.settings?.data);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error finding session", error: error.message });
  }
}
