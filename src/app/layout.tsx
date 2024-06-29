import type { Metadata } from "next";
import { Livvic } from "next/font/google"; 
import "./globals.css";


const lato = Livvic({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

export const metadata: Metadata = {
  title: "Founders Edge",
  description: "Helping you develop your online presence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        {children}
      </body>
    </html>
  );
}
