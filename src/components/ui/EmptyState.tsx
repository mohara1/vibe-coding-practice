/*
 * 빈 화면. 무엇이 없는지 분명히 말하고, 할 수 있는 행동이 있으면 같이 준다
 * (docs/requirements.md 4.10). 사과하지 않는다.
 *
 * 이전에는 화면마다 점선 박스·맨 글자 등 네 가지 모양으로 갈려 있었다.
 */
export default function EmptyState({
  message,
  action,
  className = "",
}: {
  message: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-dashed border-hamo-200 bg-white px-4 py-7 text-center ${className}`}
    >
      <p className="text-sm text-slate-500">{message}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
