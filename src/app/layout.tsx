import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chinmay Agrawal",
  description: "Founder's Office, BizOps, and AI Generalist. Shipped three live AI systems. Looking for the next messy problem to own.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
