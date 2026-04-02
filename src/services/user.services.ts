import privateApi from "@/api/axiosInstance";
import { toCamel, toSnake } from "@/lib/case";
import { UpdateProfilePayload } from "@/types/common.type";

export async function getUser() {
  const response = await privateApi.get("/users/profile")

  if (!response.data.success) throw new Error(response.data?.message || "Gagal mengambil data pengguna")  

  return toCamel(response.data.data)
}

export async function deleteMe() {
  const response = await privateApi.delete("/users/profile")
  
  if (!response.data.success) throw new Error(response.data?.message || "Gagal menghapus data pengguna")  
  
  return toCamel(response.data.data)
}

export async function updateMe(credentials: Partial<UpdateProfilePayload>) {
  const response = await privateApi.patch("/users/profile", toSnake(credentials))
      
  return response.data
}