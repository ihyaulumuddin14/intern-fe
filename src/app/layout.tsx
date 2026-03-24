import ClientProvider from "@/components/providers/ClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { toCamel } from "@/lib/case";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { getQueryClient } from "@/lib/queryClient";
import { API_URL } from "@/config/env"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["700", "600", "500", "400"]
})

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: "italic",
  weight: ["700", "600", "500", "400"]
})

export const metadata: Metadata = {
  title: "SkillGap",
  description: "Website diagnosis kesiapan karier dengan fitur unggulan dan memberikan rekomendasi pengembangan kompetensi.",
};

export default async function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode
}>) {
  /**
   * because it must run on the server
   */
  const queryClient = getQueryClient()
  const cookieStore = await cookies()

  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        cache: 'force-cache',
        headers: {
          Cookie: cookieStore.toString()
        },
        // next: {
        //   revalidate: 60 * 1000
        // }
      })
      
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      const data = await res.json()
      console.log("dari server", toCamel(data.data))
      return toCamel(data.data)
    }
  })

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} antialiased`}
      >
        <ClientProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Toaster position="top-center"/>
            {children}
            {modal}
          </HydrationBoundary>
        </ClientProvider>
      </body>
    </html>
  );
}
