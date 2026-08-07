/*
 * 인라인 SVG 아이콘. 아이콘 라이브러리를 설치하지 않는다 (docs/requirements.md 4.9).
 * 모두 currentColor 를 쓰므로 색은 text-* 로 정한다.
 * 뜻은 옆의 글자가 전달하므로 아이콘 자체는 aria-hidden 이다.
 */

type IconProps = {
  className?: string;
};

function Svg({
  className = "h-6 w-6",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/** 정보탭 — 위아래로 흐르는 카드 피드 */
export function FeedIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4.5" width="17" height="6.5" rx="2" />
      <rect x="3.5" y="13" width="17" height="6.5" rx="2" />
    </Svg>
  );
}

/** 공간탭 — 지도 핀 */
export function PlaceIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21c4-4.9 6-8.2 6-10.7A6 6 0 0 0 6 10.3C6 12.8 8 16.1 12 21Z" />
      <circle cx="12" cy="10.3" r="2.2" />
    </Svg>
  );
}

/** 참여탭 — 두 사람 */
export function JoinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9.2" cy="8.2" r="3.1" />
      <path d="M3.6 19.6c0-3.1 2.5-5.2 5.6-5.2s5.6 2.1 5.6 5.2" />
      <path d="M16.2 6.5a3.1 3.1 0 0 1 0 6.2" />
      <path d="M17.4 15c1.9.7 3.2 2.4 3.2 4.6" />
    </Svg>
  );
}

/** 마이탭 — 한 사람 */
export function MeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8.2" r="3.4" />
      <path d="M5.2 20c0-3.5 3-6 6.8-6s6.8 2.5 6.8 6" />
    </Svg>
  );
}

/** 찜 하트. filled 면 채우고, 아니면 선만 그린다. */
export function HeartIcon({
  className = "h-6 w-6",
  filled = false,
}: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 20.3c-4.6-4-7.5-6.7-7.5-9.8a4 4 0 0 1 7.5-2 4 4 0 0 1 7.5 2c0 3.1-2.9 5.8-7.5 9.8Z" />
    </svg>
  );
}

/** 뒤로가기 */
export function ArrowLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14.5 19 8 12l6.5-7" />
    </Svg>
  );
}

/** 목록 행의 "더 보기" 표시 */
export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 5 16 12l-6.5 7" />
    </Svg>
  );
}

/** 검색창 */
export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="M15.5 15.5 20.5 20.5" />
    </Svg>
  );
}
