import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UIProvider } from "@/components/ui/UIProvider";
import { CookieBanner } from "@/components/layout/CookieBanner";

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
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9324122345100415"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-full flex flex-col custom-scrollbar overflow-x-hidden">
        <GoogleAnalytics gaId="G-M3PL8V36K6" />
        <UIProvider>
          {children}
          {/* Sonner Toaster */}
          <Toaster position="top-center" style={{ zIndex: 99999 }} />
          {/* Global Cookie Consent Banner */}
          <CookieBanner />
        </UIProvider>
      
          {/* JSON-LD Structured Data for Google Knowledge Graph */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "PortoTree",
                "url": "https://portotree.com",
                "logo": "https://portotree.com/logo-landscape.png",
                "foundingDate": "2026-07-20",
                "founders": [
                  {
                    "@type": "Person",
                    "name": "Naufal Faiz Mubarak"
                  }
                ],
                "description": "PortoTree adalah platform digital asal Indonesia yang digunakan untuk membangun identitas profesional secara gratis. Memfasilitasi pembuatan portofolio online, CV standar ATS, serta dokumen karier pendukung lainnya dalam satu tempat."
              })
            }}
          />
        </body>
    </html>
  );
}
