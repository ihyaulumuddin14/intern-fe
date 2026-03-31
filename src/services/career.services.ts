import privateApi from "@/api/axiosInstance";
import { apiConfig } from "@/config/env";
import { toCamel } from "@/lib/case";
import { Career } from "@/types/entities.type";

export async function getCareers() {
  const response = await privateApi.get(`${apiConfig.BASE_URL}/careers`);

  if (!response.data.success) {
    throw new Error(response.data.error?.message || "Data karier gagal diambil");
  }

  return toCamel(response.data.data) as Career[];
}
