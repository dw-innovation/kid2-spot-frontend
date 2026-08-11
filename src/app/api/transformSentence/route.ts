export const maxDuration = 60;

import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const token = await getToken({ req, raw: true });

  if (!session || !session.user?.name) {
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

  const userEmail = session.user?.email || "";
  const userName = session.user?.name || "";
  const data = await req.json();
  const APP_SALT = process.env.APP_SALT || "";

  const isKid2 = userName.toLowerCase().includes("kid2");

  const prefix = [
    userEmail.toLowerCase().endsWith("@dw.com") ? "DW" : null,
    isKid2 ? "KID2" : null,
  ]
    .filter(Boolean)
    .join("-");

  const hash = crypto
    .createHash("sha256")
    .update(userName + APP_SALT)
    .digest("hex");

  // KID2 accounts are internal test users — keep them identifiable in the logs.
  const finalUsername = isKid2
    ? userName
    : prefix
      ? `${prefix}-${hash.slice(-5)}`
      : hash.slice(-5);

  const body = {
    ...data,
    environment: process.env.ENVIRONMENT || "production",
    username: finalUsername,
    model: process.env.NLP_MODEL || "t5",
  };

  try {
    console.log(body);
    const response = await fetch(
      `${process.env.NLP_API}/transform-sentence-to-imr`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
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
  } catch (error) {
    console.log(error);
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
