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
    const params = new URLSearchParams({
      key: process.env.MAPTILER_KEY || "",
      language: "en",
      limit: "10",
      types:
        "region,subregion,county,joint_municipality,joint_submunicipality,municipality,municipal_district,locality",
    });

    const response = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?${params}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { status: "error", message: errorData.message || "Geocoding request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { status: "error", message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
