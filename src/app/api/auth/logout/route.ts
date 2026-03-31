import { apiConfig } from "@/config/env";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await fetch(`${apiConfig.BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.get("cookie") ?? "",
    },
    credentials: "include",
  });

  const body = await res.text();

  const response = new Response(body, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const cookies = res.headers.getSetCookie?.() ?? [];
  cookies.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  response.headers.append(
    "Set-Cookie",
    "refresh_token=; Path=/; Max-Age=0; HttpOnly; SameSite=None; Secure"
  );

  response.headers.append(
    "Set-Cookie",
    "role=; Path=/; Max-Age=0; HttpOnly; SameSite=None; Secure"
  );

  return response;
}