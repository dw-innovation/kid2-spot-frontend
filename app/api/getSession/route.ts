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

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("sessions");

    const result = await collection.findOne({ id: id });

    return Response.json(result?.settings?.data, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { message: "Error finding session", error: error.message },
      { status: 500 }
    );
  }
}
