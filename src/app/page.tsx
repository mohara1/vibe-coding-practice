import HomeFeed from "@/components/HomeFeed";
import { getFeed } from "@/lib/feed";

export default function Home() {
  const feed = getFeed();

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">잇다</h1>
        <p className="mt-1 text-sm text-zinc-500">
          진주 청년을 위한 정책과 커뮤니티 공간을 한 곳에서
        </p>

        <div className="mt-6">
          <HomeFeed items={feed} />
        </div>
      </main>
    </div>
  );
}
