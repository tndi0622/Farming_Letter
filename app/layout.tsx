import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "GamePulse | PC & 콘솔 게임 인사이트",
  description: "게이머를 위한 모든 정보. 최신 뉴스, 리뷰, 그리고 나만을 위한 맞춤형 게임 트래킹.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-black text-white selection:bg-[--primary] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
