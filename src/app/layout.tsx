import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkipProvider } from "@/components/skip-provider";
import { ReadingProgress } from "@/components/reading-progress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "dangerously skip — we built safety checks for a reason",
  description:
    "A practitioner's confession about AI safety, speed, and the moment you decide to trust the machine more than the process.",
  openGraph: {
    title: "dangerously skip",
    description:
      "We built safety checks for a reason. I turned mine off.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SkipProvider>
          <ReadingProgress />
          <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </SkipProvider>
      </body>
    </html>
  );
}
