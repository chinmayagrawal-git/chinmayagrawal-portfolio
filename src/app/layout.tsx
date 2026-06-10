import type { Metadata } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chinmay Agrawal",
  description: "Founder's Office, BizOps, and AI Generalist. Shipped three live AI systems at Wishlink.",
  openGraph: {
    title: "Chinmay Agrawal",
    description: "Founder's Office, BizOps, and AI Generalist. Shipped three live AI systems at Wishlink.",
    url: "https://chinmayagrawal-portfolio.netlify.app",
    siteName: "Chinmay Agrawal",
    images: [
      {
        url: "https://chinmayagrawal-portfolio.netlify.app/og-banner.jpg",
        width: 1424,
        height: 752,
        alt: "Chinmay Agrawal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmay Agrawal",
    description: "Founder's Office, BizOps, and AI Generalist. Shipped three live AI systems at Wishlink.",
    images: ["https://chinmayagrawal-portfolio.netlify.app/og-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
