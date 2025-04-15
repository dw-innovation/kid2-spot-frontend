import { Db, MongoClient } from "mongodb";

let cachedDb: Db;

// Function to connect to MongoDB, reusing a cached connection if available
export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.MONGODB_URI || "");
  const db = client.db(process.env.MONGODB_DBNAME);
  cachedDb = db;
  return db;
}
