import { notFound } from "next/navigation";
import { getPolicyById } from "@/lib/feed";
import CategoryBadge from "@/components/CategoryBadge";
import DdayBadge from "@/components/DdayBadge";
import FiveW1HBlock from "@/components/FiveW1HBlock";
import FavoriteButton from "@/components/FavoriteButton";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import { buttonClass } from "@/components/ui/Button";

export default async function PolicyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const policy = getPolicyById(Number(id));

  if (!policy) notFound();

  return (
    <PageShell>
      <PageHeader
        backHref="/"
        backLabel="정보탭으로"
        title={
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            {policy.title}
            <DdayBadge applyEnd={policy.applyEnd} />
          </span>
        }
        action={<FavoriteButton kind="policy" id={policy.id} />}
      />

      <div className="mt-4">
        <CategoryBadge category={policy.category} />
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
        {policy.description}
      </p>

      <FiveW1HBlock detail={policy.detail} />

      <a
        href={policy.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass({ className: "mt-6" })}
      >
        신청 바로가기
      </a>
    </PageShell>
  );
}
