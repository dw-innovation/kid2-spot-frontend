export const maxDuration = 60;

import axios from "axios";
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
    const results = await axios({
      method: "POST",
      url: `${process.env.OSM_API}/run-spot-query`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });

    return NextResponse.json(results.data, { status: 200 });
  } catch (error: unknown) {
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
