import { Db, MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

let cachedDb: Db;

// Function to connect to MongoDB, reusing a cached connection if available
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

  // Validate if 'id' query parameter exists
  if (!id) {
    return NextResponse.json(
      { message: "missingSessionId", status: "error" },
      { status: 400 }
    );
  }

  try {
    // Connect to MongoDB and get the 'sessions' collection
    const db = await connectToDatabase();
    const collection = db.collection("sessions");

    // Search for the session by its 'id'
    const result = await collection.findOne({ id: id });

    // Send back the found session data or null if not found
    return NextResponse.json(
      {
        status: "success",
        message: "sessionFound",
        data: result?.settings?.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle any errors during the database operation
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
