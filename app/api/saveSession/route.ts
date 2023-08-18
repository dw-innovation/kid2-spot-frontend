import { Db, MongoClient } from "mongodb";
import { NextApiRequest } from "next";
import shortUUID from "short-uuid";

let cachedDb: Db;

async function connectToDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.MONGODB_URI || "");

  const db = client.db(process.env.MONGODB_DBNAME);
  cachedDb = db;
  return db;
}

export async function POST(req: NextApiRequest) {
  const id = shortUUID.generate();
  const data = {
    id: id,
    settings: req.body,
    date: new Date(),
  };

  try {
    const db = await connectToDatabase();
    const collection = db.collection("sessions");

    await collection.insertOne(data);

    return Response.json(
      {
        message: "data added successfully",
        id: id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        message: "Error adding data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
