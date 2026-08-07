/*
 * 진주 한 알. 하모의 왕진주 목걸이에서 따온 이 화면의 시그니처다.
 *
 * 딱 세 곳에만 쓴다 (docs/requirements.md 4.8):
 *   1. 하단탭 활성 표시   2. 섹션 제목 앞   3. 지도에서 강조된 공간
 *
 * 그 외 어디에도 쓰지 않는다. 흩뿌리면 시그니처가 아니라 장식이 된다.
 * 색은 currentColor 를 따른다.
 */
export default function PearlDot({
  className = "h-1.5 w-1.5",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 8 8" aria-hidden="true" className={className}>
      <circle cx="4" cy="4" r="4" fill="currentColor" />
      {/* 왼쪽 위에 빛이 도는 점 하나 — 이게 있어서 구슬로 읽힌다 */}
      <circle cx="2.7" cy="2.6" r="1.05" fill="#fff" fillOpacity="0.75" />
    </svg>
  );
}
