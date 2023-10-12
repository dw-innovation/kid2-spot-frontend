import { Db, MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import shortUUID from "short-uuid";

let cachedDb: Db;

// Function to connect to MongoDB, reusing a cached connection if available
async function connectToDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.MONGODB_URI || "");
  const db = client.db(process.env.MONGODB_DBNAME);
  cachedDb = db;
  return db;
}

export async function POST(req: NextRequest) {
  // Generate a short UUID for the new session
  const id = shortUUID.generate();

  // Parse the request payload
  const payload = await req.json();

  // Construct the data object to be inserted into the database
  const data = {
    id: id,
    settings: payload,
    date: new Date(),
  };

  try {
    // Connect to MongoDB and get the 'sessions' collection
    const db = await connectToDatabase();
    const collection = db.collection("sessions");

    // Insert the new session data into the database
    await collection.insertOne(data);

    // Return a success response along with the generated ID
    return NextResponse.json(
      {
        status: "success",
        message: "sessionSuccessfullySaved",
        id: id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle any errors during the database operation
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
