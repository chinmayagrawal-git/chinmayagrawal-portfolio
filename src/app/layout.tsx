import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chinmay Agrawal",
  description: "Founder's Office, BizOps, and AI Generalist. Shipped three live AI systems. Looking for the next messy problem to own.",
  openGraph: {
    title: "Chinmay Agrawal",
    description: "Founder's Office, BizOps, and AI Generalist. Shipped three live AI systems. Looking for the next messy problem to own.",
    url: "https://chinmayagrawal-portfolio.netlify.app",
    siteName: "Chinmay Agrawal",
    images: [
      {
        url: "https://chinmayagrawal-portfolio.netlify.app/chinmay.jpg",
        width: 1200,
        height: 630,
        alt: "Chinmay Agrawal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmay Agrawal",
    description: "Founder's Office, BizOps, and AI Generalist. Shipped three live AI systems. Looking for the next messy problem to own.",
    images: ["https://chinmayagrawal-portfolio.netlify.app/chinmay.jpg"],
  },
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
