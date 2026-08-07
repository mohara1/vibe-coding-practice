import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import NavTabs from "@/components/NavTabs";
import "./globals.css";

// 본문·UI 글꼴. 한글 글리프는 unicode-range로 200개 넘게 잘려 있고,
// 브라우저는 그중 화면에 실제로 쓰인 글자가 든 청크만 받아간다.
//
// preload: false 인 이유 — 켜두면 next/font 가 그 청크 189개(약 3MB)에
// 전부 <link rel=preload> 를 걸어버린다. 끄면 필요한 몇 개만 받는다.
// 대신 첫 화면에서 잠깐 시스템 고딕으로 보였다가 바뀐다 (display: swap).
const plexKr = IBM_Plex_Sans_KR({
  variable: "--font-plex-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
  fallback: ["Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
});

// D-day·인원수 같은 숫자용. 자리수가 흔들리지 않는다.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "잇다",
  description: "진주 청년을 위한 정책·커뮤니티 공간 연결 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${plexKr.variable} ${plexMono.variable} h-full antialiased`}
    >
      {/* 하단 여백 = 탭 높이(4rem) + 아이폰 홈 인디케이터 영역 */}
      <body className="flex min-h-full flex-col pb-[calc(4rem+env(safe-area-inset-bottom))]">
        {children}
        <NavTabs />
      </body>
    </html>
  );
}
