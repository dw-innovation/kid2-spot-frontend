import { Db, MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import shortUUID from "short-uuid";

let cachedDb: Db;

async function connectToDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.MONGODB_URI || "");

  const db = client.db(process.env.MONGODB_DBNAME);
  cachedDb = db;
  return db;
}

export async function POST(req: NextRequest) {
  const id = shortUUID.generate();
  const payload = await req.json();
  const data = {
    id: id,
    settings: payload,
    date: new Date(),
  };

  try {
    const db = await connectToDatabase();
    const collection = db.collection("sessions");

    await collection.insertOne(data);

    return NextResponse.json(
      {
        status: "success",
        message: "dataAddedSuccessfully",
        id: id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: "errorAddingData",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
