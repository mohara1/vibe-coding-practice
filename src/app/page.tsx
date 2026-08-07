import HomeFeed from "@/components/HomeFeed";
import PageShell from "@/components/PageShell";
import { getFeed } from "@/lib/feed";

export default function Home() {
  const feed = getFeed();

  return (
    <PageShell>
      <HomeFeed items={feed} />
    </PageShell>
  );
}
