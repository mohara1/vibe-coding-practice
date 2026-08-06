import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpaceById } from "@/lib/feed";
import { spaces } from "@/data/spaces";
import CategoryBadge from "@/components/CategoryBadge";
import MockMap from "@/components/MockMap";
import CardPhoto from "@/components/CardPhoto";
import FiveW1HBlock from "@/components/FiveW1HBlock";
import FavoriteButton from "@/components/FavoriteButton";

export default async function SpaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const space = getSpaceById(Number(id));

  if (!space) notFound();

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700">
          ← 정보탭으로
        </Link>

        <div className="mt-4">
          <MockMap spaces={spaces} highlightId={space.id} />

          <div className="mt-4">
            <div className="flex items-start justify-between gap-2">
              <CategoryBadge category={space.category} />
              <FavoriteButton kind="space" id={space.id} />
            </div>
            <h1 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {space.name}
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">{space.description}</p>

            <FiveW1HBlock detail={space.detail} />
          </div>

          <div className="mt-6">
            <CardPhoto
              photoUrl={space.photoUrl}
              category={space.category}
              name={space.name}
              size="large"
            />
          </div>

          <h2 className="mt-8 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            후기
          </h2>
          <ul className="mt-3 space-y-2">
            {space.reviews.map((review, i) => (
              <li
                key={i}
                className="rounded-lg border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {review.author}
                </span>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
