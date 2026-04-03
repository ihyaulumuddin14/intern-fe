import ClientProvider from "@/components/providers/ClientProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import QuizSessionGuard from "@/components/providers/QuizSessionGuard";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["700", "600", "500", "400", "300", "200", "100"]
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
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} antialiased`}
      >
        <QuizSessionGuard>
          <ClientProvider>
            <Toaster position="top-center"/>
            {children}
            {modal}
          </ClientProvider>
        </QuizSessionGuard>
      </body>
    </html>
  );
}
