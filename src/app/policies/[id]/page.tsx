import Link from "next/link";
import { notFound } from "next/navigation";
import { getPolicyById } from "@/lib/feed";
import CategoryBadge from "@/components/CategoryBadge";

export default async function PolicyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const policy = getPolicyById(Number(id));

  if (!policy) notFound();

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700">
          ← 정보탭으로
        </Link>

        <div className="mt-4">
          <CategoryBadge category={policy.category} />
          <h1 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {policy.title}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{policy.description}</p>

          <a
            href={policy.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900"
          >
            신청 바로가기
          </a>
        </div>
      </main>
    </div>
  );
}
