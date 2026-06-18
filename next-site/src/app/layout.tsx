import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const shippori = Shippori_Mincho({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"], // Shippori Mincho supports Japanese internally, we subset latin for loading
  variable: "--font-shippori",
});

export const metadata: Metadata = {
  title: {
    default: "Hinode Nepal | ヒマラヤ旅行の専門家",
    template: "%s | Hinode Nepal",
  },
  description:
    "ヒノデネパールは日本人旅行者のためのネパール高級旅行を専門とします。エベレストトレッキング、文化ツアー、野生動物サファリ。",
  metadataBase: new URL("https://hinodenepal.jp"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${cormorant.variable} ${shippori.variable} h-full antialiased`}>
      <body className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C] font-sans antialiased selection:bg-[#8B2C24] selection:text-white">
        {children}
      </body>
    </html>
  );
}
