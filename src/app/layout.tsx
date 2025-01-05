import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoinCraft",
  description: "Craft Your Custom Crypto Coin!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-montserrat antialiased flex h-screen bg-colors-bone">
        {children}
      </body>
    </html>
  );
}
