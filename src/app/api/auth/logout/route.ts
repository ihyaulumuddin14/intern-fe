import { apiConfig } from "@/config/env";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await fetch(`${apiConfig.BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      cookie: req.headers.get("cookie") ?? "",
    },
  });

  const body = await res.text();

  const response = new Response(body, {
    status: res.status,
    headers: {
      "Content-Type":
        res.headers.get("content-type") ?? "application/json",
    },
  });

  const cookies = res.headers.getSetCookie?.() ?? [];

  if (cookies.length > 0) {
    cookies.forEach((cookie) => {
      response.headers.append("Set-Cookie", cookie);
    });
  } else {
    response.headers.append(
      "Set-Cookie",
      "refresh_token=; Path=/; Max-Age=0; HttpOnly; SameSite=None; Secure"
    );

    response.headers.append(
      "Set-Cookie",
      "role=; Path=/; Max-Age=0; HttpOnly; SameSite=None; Secure"
    );
  }

  return response;
}