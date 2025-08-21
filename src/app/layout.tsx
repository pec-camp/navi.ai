import "@/app/globals.css";

import { Onest, Rajdhani } from "next/font/google";
import localFont from "next/font/local";

import { Logo } from "../shared/ui";
import { Header } from "../widgets/header";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-onest",
  fallback: ["var(--font-pretendard)"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Product Engineer Community",
  description: "코드를 넘어, 가치를 만드는 엔지니어들의 성장 공간",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${onest.variable} ${pretendard.variable} ${rajdhani.variable}`}
    >
      <body className="bg-background text-foreground">
        {/* Global background removed; mounted per-route where needed */}

        {/* Header */}
        <Header />

        {/* Main */}
        <main className="container mx-auto mb-20 flex min-h-screen flex-col items-center px-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-border bg-surface-secondary">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* 로고 및 설명 섹션 */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Logo />
                  <span className="text-xl font-bold text-foreground">
                    Navi.ai
                  </span>
                </div>
                <p className="max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                  Discover the world&#39;s top AI tools. Find the perfect
                  solution for every task with our curated collection of 21,346+
                  AI tools.
                </p>
              </div>
            </div>

            {/* 구분선 및 저작권 정보 */}
            <div className="mt-8 border-t border-border pt-8">
              <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                <p className="text-xs font-light text-muted-foreground">
                  © 2025 Navi.ai. All rights reserved.
                </p>
                <div className="flex space-x-6 font-light">
                  <a
                    href="/privacy"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/contact"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/help"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Help Center
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
