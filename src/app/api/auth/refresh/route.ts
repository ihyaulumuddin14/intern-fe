import { apiConfig } from "@/config/env";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const backendRes = await fetch(`${apiConfig.BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      cookie: req.headers.get("cookie") ?? "",
    },
  });

  const body = await backendRes.text();

  const response = new Response(body, {
    status: backendRes.status,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const cookies = backendRes.headers.getSetCookie?.() ?? [];
  
  cookies.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}