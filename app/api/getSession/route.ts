import { Db, MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

let cachedDb: Db;

async function connectToDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.MONGODB_URI || "");

  const db = client.db(process.env.MONGODB_DBNAME);
  cachedDb = db;
  return db;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Missing id" }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("sessions");

    const result = await collection.findOne({ id: id });

    return NextResponse.json(result?.settings?.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error finding session", error: error.message },
      { status: 500 }
    );
  }
}
