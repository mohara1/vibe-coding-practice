import { notFound } from "next/navigation";
import { getSpaceById } from "@/lib/feed";
import { spaces } from "@/data/spaces";
import CategoryBadge from "@/components/CategoryBadge";
import MockMap from "@/components/MockMap";
import CardPhoto from "@/components/CardPhoto";
import FiveW1HBlock from "@/components/FiveW1HBlock";
import FavoriteButton from "@/components/FavoriteButton";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function SpaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const space = getSpaceById(Number(id));

  if (!space) notFound();

  return (
    <PageShell>
      <PageHeader
        backHref="/"
        backLabel="정보탭으로"
        title={space.name}
        action={<FavoriteButton kind="space" id={space.id} />}
      />

      {/* 지도 → 6하원칙 → 사진 → 후기 순 (docs/requirements.md 공간 상세) */}
      <div className="mt-4">
        <MockMap spaces={spaces} highlightId={space.id} />
      </div>

      <div className="mt-4">
        <CategoryBadge category={space.category} />
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
        {space.description}
      </p>

      <FiveW1HBlock detail={space.detail} />

      <div className="mt-6">
        <CardPhoto
          photoUrl={space.photoUrl}
          category={space.category}
          name={space.name}
          size="large"
        />
      </div>

      <section className="mt-8">
        <SectionHeading>후기</SectionHeading>
        <ul className="mt-3 space-y-2">
          {space.reviews.map((review, i) => (
            <li
              key={i}
              className="rounded-control border border-slate-200 bg-white p-3.5"
            >
              <span className="text-[13px] font-medium text-slate-500">
                {review.author}
              </span>
              <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
                {review.content}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
