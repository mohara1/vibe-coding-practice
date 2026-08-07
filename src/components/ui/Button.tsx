/*
 * 버튼 4종 × 2크기. 이 조합 밖의 버튼을 새로 만들지 않는다
 * (docs/requirements.md 4.7).
 *
 * <a> 나 <Link> 를 버튼처럼 보이게 할 때는 buttonClass() 를 쓴다.
 */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hamo-600 disabled:pointer-events-none disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-hamo-600 text-white hover:bg-hamo-700 active:bg-hamo-800",
  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50",
  ghost: "bg-hamo-100 text-hamo-700 hover:bg-hamo-200",
  // rose-700 인 이유: rose-600 은 하모-50 배경 위에서 4.29:1 로 기준에 못 미친다
  danger: "text-rose-700 hover:bg-rose-50",
};

// md 는 44px 높이 — 모바일에서 손가락으로 누르는 크기 (4.7절, 0절)
const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, className })}
      {...props}
    />
  );
}
