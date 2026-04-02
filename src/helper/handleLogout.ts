  import { privateApi } from "@/api/axiosInstance";
  import { getQueryClient } from "@/lib/queryClient";
  import { logoutUser } from "@/services/auth.services";

  export async function handleLogout() {
    try {
      await logoutUser();
    } catch {
    } finally {
      delete privateApi.defaults.headers.common["Authorization"];
      getQueryClient().clear();
      window.location.href = "/"
    }
  }