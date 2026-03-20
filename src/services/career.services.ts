import { toCamel } from "@/lib/case";
import axios from "axios";
import { Career } from "@/types/entities.type";

export async function getCareers() {
  const response = await axios.get("/api/careers");

  await new Promise(res => setTimeout(res, 2000))

  if (!response.data.success) {
    throw new Error(response.data.error?.message || "Data karir gagal diambil");
  }

  return toCamel(response.data.data) as Career[];
}
