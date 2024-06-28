import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

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

  const data = await req.json();

  try {
    const results = await axios({
      url: `${process.env.OSM_API}/run-osm-query`,
      method: "POST",
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
