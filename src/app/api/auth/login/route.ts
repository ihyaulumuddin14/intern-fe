import { apiConfig } from "@/config/env";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const backendRes = await fetch(`${apiConfig.BASE_URL}/auth/login`, {
    method: "POST",
    body: await req.text(),
    headers: { "Content-Type": "application/json" },
  });

  const body = await backendRes.text();

  const response = new Response(body, {
    status: backendRes.status,
    headers: {
      "Content-Type":
        backendRes.headers.get("content-type") ?? "application/json",
    },
  });

  // 🔴 ini yang memperbaiki staging
  const cookies = backendRes.headers.getSetCookie?.() ?? [];

  cookies.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}