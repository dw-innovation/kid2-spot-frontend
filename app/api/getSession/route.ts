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
    return NextResponse.json(
      { message: "missingSessionId", status: "error" },
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("sessions");

    const result = await collection.findOne({ id: id });

    return NextResponse.json(
      {
        status: "success",
        message: "sessionFound",
        data: result?.settings?.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: "errorFindingSession",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
