/*
 * 모든 화면의 껍데기. 이전에는 8개 페이지가 이 두 줄을 각자 복붙하고 있었다.
 * 배경색은 body 가 이미 하모-50 이라 여기서 다시 칠하지 않는다.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 justify-center">
      <main className="w-full max-w-3xl px-4 py-7 sm:px-8">{children}</main>
    </div>
  );
}
