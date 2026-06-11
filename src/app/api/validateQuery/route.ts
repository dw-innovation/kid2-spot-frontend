export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const token = await getToken({ req, raw: true });

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

  const data = await req.json();

  try {
    const response = await fetch(
      `${process.env.OSM_API}/validate-spot-query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          status: "error",
          message: errorData.message || "Unknown error occurred",
        },
        {
          status: response.status,
        }
      );
    }

    const results = await response.json();
    return NextResponse.json(results, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
