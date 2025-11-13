import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeBridge Labs - Computer Science Education for Schools",
  description: "Turn-key programming courses taught by real software engineers. Curriculum, LMS, and instructors included. Bring modern CS education to your school.",
  keywords: ["computer science education", "programming courses", "school curriculum", "STEM education", "coding classes"],
  authors: [{ name: "CodeBridge Labs" }],
  openGraph: {
    title: "CodeBridge Labs - Computer Science Education for Schools",
    description: "Turn-key programming courses taught by real software engineers. Curriculum, LMS, and instructors included.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeBridge Labs - Computer Science Education for Schools",
    description: "Turn-key programming courses taught by real software engineers. Curriculum, LMS, and instructors included.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
