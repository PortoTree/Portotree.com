import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import "./globals.css";
import { DevToast } from "@/components/layout/DevToast";
import { Toaster } from "@/components/ui/sonner";
import { UIProvider } from "@/components/ui/UIProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PortoTree - Web Portofolio Online",
  description: "Buat web portofolio online profesional tanpa coding dengan PortoTree.",
  openGraph: {
    images: ['/logo-portotree.png'],
  },
  twitter: {
    card: "summary_large_image",
    images: ['/logo-portotree.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col custom-scrollbar overflow-x-hidden">
        <GoogleAnalytics gaId="G-M3PL8V36K6" />
        <UIProvider>
          {children}
          
          {/* Temporary Development Toast */}
          <DevToast />
          
          {/* Sonner Toaster */}
          <Toaster position="top-center" style={{ zIndex: 99999 }} />
        </UIProvider>
      </body>
    </html>
  );
}
