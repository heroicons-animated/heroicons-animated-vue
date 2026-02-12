export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq: "weekly" | "monthly";
  priority: 0.7 | 1;
}
