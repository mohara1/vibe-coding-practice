import HomeFeed from "@/components/HomeFeed";
import { getFeed } from "@/lib/feed";

export default function Home() {
  const feed = getFeed();

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
        <HomeFeed items={feed} />
      </main>
    </div>
  );
}
