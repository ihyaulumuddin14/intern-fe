import { apiConfig } from "@/config/env";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await fetch(`${apiConfig.BASE_URL}/auth/login`, {
    method: "POST",
    body: await req.text(),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await res.text();
  const setCookie = res.headers.get("set-cookie");

  return new Response(data, {
    headers: {
      "set-cookie": setCookie ?? "",
      "content-type": "application/json",
    },  
  });
}