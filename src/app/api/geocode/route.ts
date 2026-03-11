import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { status: "error", message: "address parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json`,
      {
        params: {
          key: process.env.MAPTILER_KEY,
          language: "en",
          limit: 10,
          types:
            "region,subregion,county,joint_municipality,joint_submunicipality,municipality,municipal_district,locality",
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { status: "error", message: error.response.data.message || "Geocoding request failed" },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { status: "error", message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
