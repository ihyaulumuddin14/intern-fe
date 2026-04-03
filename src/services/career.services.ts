import privateApi from "@/api/axiosInstance";
import { apiConfig } from "@/config/env";
import { toCamel } from "@/lib/case";
import { Career } from "@/types/entities.type";

export async function getCareers() {
  const response = await privateApi.get(`${apiConfig.BASE_URL}/careers`);

  if (!response.data.success) {
    throw new Error(response.data.error?.message || "Data karier gagal diambil");
  }

  const careersMapped = toCamel(response.data.data).map((career: {
    careerId: string,
    desc: string,
    name: string
  }) => ({
    id: career.careerId,
    name: career.name,
    description: career.desc,
  }))
  return careersMapped as Career[];
}


export async function getCareerById(careerId: string) {
  const response = await privateApi.get(`${apiConfig.BASE_URL}/careers/${careerId}`);

  if (!response.data.success) {
    throw new Error(response.data.error?.message || "Data karier gagal diambil");
  }

  const career = toCamel(response.data.data);
  const careerMapped = {
    id: career.careerId,
    name: career.name,
    description: career.desc,
  }
  return careerMapped as Career;
}