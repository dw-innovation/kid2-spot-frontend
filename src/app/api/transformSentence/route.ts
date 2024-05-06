import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const results = await axios({
      url: `${process.env.NLP_API}/transform-sentence-to-imr`,
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
