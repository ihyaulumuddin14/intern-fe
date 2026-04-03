import { Career } from "@/types/entities.type";
import { NextResponse } from "next/server";

const careers: Career[] = [
  { id: "1", name: "Frontend Developer", description: "Lorem ipsum"},
  { id: "2", name: "Backend Developer", description: "Lorem ipsum"},
  { id: "3", name: "UI/UX Designer", description: "Lorem ipsum"},
  { id: "4", name: "Data Scientist", description: "Lorem ipsum"},
  { id: "5", name: "DevOps Engineer", description: "Lorem ipsum"},
  { id: "6", name: "Product Manager", description: "Lorem ipsum"},
  { id: "7", name: "Mobile Developer", description: "Lorem ipsum"},
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