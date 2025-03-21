import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Литейный проспект | Историко-архитектурное исследование",
  description: "Изучение историко-архитектурного наследия Литейного проспекта в Санкт-Петербурге",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-stone-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
