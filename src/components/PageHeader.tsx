import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

/*
 * 화면 제목 영역. 뒤로가기와 우측 슬롯을 한 규칙으로 묶는다.
 * 이전에는 페이지마다 제목 크기·뒤로가기 링크 모양이 조금씩 달랐다.
 */
export default function PageHeader({
  title,
  description,
  backHref,
  backLabel,
  action,
}: {
  title: React.ReactNode;
  description?: string;
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
}) {
  return (
    <header>
      {backHref && (
        <Link
          href={backHref}
          className="-ml-1 inline-flex items-center gap-1 rounded-control px-1 py-1 text-sm text-slate-500 transition-colors hover:text-hamo-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {backLabel ?? "뒤로"}
        </Link>
      )}

      <div
        className={`flex items-start justify-between gap-3 ${backHref ? "mt-3" : ""}`}
      >
        <div className="min-w-0">
          <h1 className="text-[28px] font-bold leading-[1.25] tracking-[-0.02em] text-hamo-900">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}
