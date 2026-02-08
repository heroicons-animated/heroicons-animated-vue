const GITHUB_REPO_API =
  "https://api.github.com/repos/heroicons-animated/heroicons-animated-vue";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day

type StarsCache = {
  stars: number;
  fetchedAt: number;
};

let cache: StarsCache | null = null;

export default defineEventHandler(async () => {
  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_DURATION_MS) {
    return { stars: cache.stars };
  }

  try {
    const data = await $fetch(GITHUB_REPO_API, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "heroicons-animated",
      },
    });

    if (typeof data?.stargazers_count === "number") {
      cache = { stars: data.stargazers_count, fetchedAt: now };
    }
  } catch {
    // ignore fetch errors and fall back to cached value if present
  }

  return { stars: cache?.stars ?? null };
});
