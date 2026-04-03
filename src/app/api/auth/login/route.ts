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

  const data = JSON.parse(body);
  if (data?.data?.access_token) {
    response.headers.append(
      "Set-Cookie",
      `access_token=${data.data.access_token}; Path=/; HttpOnly; SameSite=Lax`
    )
  }
    
  const cookies = backendRes.headers.getSetCookie?.() ?? [];

  cookies.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}