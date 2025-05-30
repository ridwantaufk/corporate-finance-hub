import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import SpiderWeb from "@/components/Background/SpiderWeb";
import ApolloWrapper from "@/components/ApolloWrapper";
import { NeumorphProvider } from "@/contexts/NeumorphContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import FullScreenLoading from "@/components/FullScreenLoading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <NeumorphProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <SpiderWeb />
            <ApolloWrapper>
              <AuthProvider>
                <FullScreenLoading />
                {children}
              </AuthProvider>
            </ApolloWrapper>
          </body>
        </NeumorphProvider>
      </ThemeProvider>
    </html>
  );
}
