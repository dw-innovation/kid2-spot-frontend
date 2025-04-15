export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import shortUUID from "short-uuid";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        status: "error",
        message: "unauthenticated",
      },
      {
        status: 401,
      }
    );
  }
  const payload = await req.json();
  const id = shortUUID.generate();

  const data = {
    id: id,
    error: payload,
    date: new Date(),
  };
  try {
    const db = await connectToDatabase();
    const collection = db.collection("errors");

    await collection.insertOne(data);

    return NextResponse.json({
      status: "success",
      message: "errorLogged",
    });
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
