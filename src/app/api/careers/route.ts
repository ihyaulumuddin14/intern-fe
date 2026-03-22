import { NextResponse } from "next/server";

const careers = [
  { id: 1, name: "Frontend Developer"},
  { id: 2, name: "Backend Developer"},
  { id: 3, name: "UI/UX Designer"},
  { id: 4, name: "Data Scientist"},
  { id: 5, name: "DevOps Engineer"},
  { id: 6, name: "Product Manager"},
  { id: 7, name: "Mobile Developer"},
];

export async function GET() {
  // mock bandwith
  await new Promise(res => setTimeout(res, 2000))

  return NextResponse.json({
    success: true,
    message: "Daftar karier berhasil diambil",
    data: careers,
  });
}