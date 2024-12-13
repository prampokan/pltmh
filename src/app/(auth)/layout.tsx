import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggler } from "@/components/theme-toggler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PLTMH Kincang",
  description: "Sistem Monitoring PLTMH Kincang",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex w-full h-screen">
            <div className="w-full sm:w-1/2 p-5 flex justify-center items-center relative">
              <div className="absolute right-5 top-5">
                <ThemeToggler />
              </div>
              {children}
            </div>
            <div className="border w-1/2 justify-center items-center hidden sm:flex">
              LOGO
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
