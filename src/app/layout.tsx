import "@/app/globals.css";
import { Onest, Rajdhani } from "next/font/google";
import localFont from "next/font/local";

import AuthButton from "@/features/auth/ui/AuthButton";
import { ExternalLink } from "@/shared/ui/ExternalLink";
import { Logo } from "@/shared/ui/Logo";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        <main className="flex min-h-screen flex-col items-center">
          <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
            <div className="flex w-full max-w-5xl items-center justify-between px-4 text-sm">
              <Logo />
              <AuthButton />
            </div>
          </nav>

          {children}

          <footer className="border-t-foreground/10 flex w-full justify-center border-t p-4 text-center text-xs">
            <div className="text-left text-stone-400">
              <div>상호명: 마중물 | 대표: 황경찬</div>
              <div>사업자등록번호: 264-01-01901</div>
              <div>정보통신업 주소: 경기도 광주시 회안대로 350-23</div>
              <div>문의: 010 5056 2412</div>
              <div className="flex justify-between">
                <ExternalLink href="https://slashpage.com/pec/terms-of-use">
                  이용약관
                </ExternalLink>
                <ExternalLink href="https://slashpage.com/pec/privacy-policy">
                  개인정보 처리방침
                </ExternalLink>
              </div>
              Copyright© PEC
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
