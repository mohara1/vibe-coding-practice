/*
 * 필터 칩. 정보탭·공간탭·온보딩에서 같은 모양을 쓴다.
 * (이전에는 세 곳에 같은 클래스 문자열이 복붙되어 있었다.)
 *
 * 선택 여부와 무관하게 테두리를 1px 유지해서 누를 때 크기가 흔들리지 않게 한다.
 */
export default function Chip({
  active,
  className = "",
  type = "button",
  ...props
}: React.ComponentProps<"button"> & { active: boolean }) {
  const tone = active
    ? "border-hamo-600 bg-hamo-600 text-white"
    : "border-slate-200 bg-white text-slate-600 hover:border-hamo-300 hover:text-hamo-700";

  return (
    <button
      type={type}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hamo-600 ${tone} ${className}`}
      {...props}
    />
  );
}
