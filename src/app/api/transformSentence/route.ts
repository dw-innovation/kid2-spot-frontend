export const maxDuration = 60;

import axios from "axios";
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

  const prefix = [
    userEmail.toLowerCase().endsWith("@dw.com") ? "DW" : null,
    userName.toLowerCase().includes("kid2") ? "KID2" : null,
  ]
    .filter(Boolean)
    .join("-");

  const hash = crypto
    .createHash("sha256")
    .update(userName + APP_SALT)
    .digest("hex");

  const finalUsername = prefix ? `${prefix}-${hash.slice(-5)}` : hash.slice(-5);

  try {
    const results = await axios({
      method: "POST",
      url: `${process.env.NLP_API}/transform-sentence-to-imr`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...data,
        environment: process.env.ENVIRONMENT || "production",
        username: finalUsername,
        model: process.env.NLP_MODEL || "t5",
      },
    });

    return NextResponse.json(results.data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return NextResponse.json(
          {
            status: "error",
            message: error.response.data.message || "Unknown error occurred",
          },
          {
            status: error.response.status,
          }
        );
      } else {
        return NextResponse.json(
          {
            status: "error",
            message: error.message || "Network or other error",
          },
          {
            status: 500,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "An unexpected error occurred",
        },
        {
          status: 500,
        }
      );
    }
  }
}
