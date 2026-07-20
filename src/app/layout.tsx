import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

export const metadata: Metadata = {
  metadataBase: new URL("https://boxplay.id"),
  title: "BoxPlay.id | Platform Gaming & Bisnis Modern Indonesia",
  description: "BoxPlay.id menghadirkan ekosistem gaming center, kemitraan, dan investasi modern yang terintegrasi untuk bisnis gaming di Indonesia.",
  keywords: ["gaming center", "boxplay", "investasi gaming", "kemitraan gaming", "platform gaming indonesia"],
  manifest: "/manifest.json",
  openGraph: {
    title: "BoxPlay.id | Platform Gaming & Bisnis Modern Indonesia",
    description: "Ekosistem gaming modern dengan sistem operasional, laporan, dan peluang investasi yang profesional.",
    url: "https://boxplay.id",
    siteName: "BoxPlay.id",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "BoxPlay.id | Platform Gaming & Bisnis Modern Indonesia",
    description: "Ekosistem gaming modern dengan sistem operasional, laporan, dan peluang investasi yang profesional.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BoxPlay",
  },
};

export const viewport: Viewport = {
  themeColor: "#2196f3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>
          <AppProvider>
            {children}
            <PWAInstallPrompt />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
