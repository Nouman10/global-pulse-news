# Global Pulse News

$0-cost, fully static news portal for Qureshi Digital Studio. Hosted on GitHub Pages. Three categories: Crypto Market, Global Politics, Movies & TV Shows.

**Live:** https://nouman10.github.io/global-pulse-news/

## Hard editorial gate

Nothing is published unless its target keyword has a **verified 5,000+ searches in the USA or UK**, from Google Trends weekly numeric volume data (`https://trends.google.com/trending?geo=US&hours=168` and `?geo=GB&hours=168`) or an explicit 5K+/10K+/20K+ label.

- The gate was originally 20,000+. On 22 November 2026 the founder lowered it to a 5,000 minimum so the portal could launch with verified demand.
- Unlabelled breakouts, estimates and rounded-up figures are rejected.
- The daily Trends RSS (`/trending/rss?geo=...`) only exposes 100+/200+/500+/1000+ buckets and is **not** sufficient evidence on its own. Use the weekly page's embedded numeric volumes.
- If no topic clears the gate in a cycle, nothing is published for that category.

## Launch articles (22 Nov 2026)

| Article | Category | Keyword | Verified volume |
|---|---|---|---|
| `articles/bitcoin-reclaims-60000.html` | Crypto Market | bitcoin price | 50,000 US |
| `articles/clarence-thomas-first-amendment.html` | Global Politics | clarence thomas first amendment warning | 200,000 US |
| `articles/hunger-games-sunrise-reaping.html` | Movies & TV Shows | hunger games sunrise on the reaping | 2,000,000 US / 200,000 GB |

## Layout

- `index.html` — portal home with category tabs and country pills.
- `assets/` — CSS and the client-side catalog renderer.
- `data/articles.json` — published catalog with per-article volume evidence.
- `articles/` — published article pages.
- `sitemap.xml`, `robots.txt`, `llms.txt` — Google + AI-search discovery files.
- `.nojekyll` — prevents Jekyll processing on GitHub Pages.
- `.github/workflows/deploy-pages.yml` — automatic deployment on every push to `main`.

## Publishing checklist (every 12-hour cycle)

1. Fetch weekly Google Trends for `geo=US` and `geo=GB` plus Google News RSS for the three categories.
2. Record topic | geo | exact numeric volume | source URL | timestamp in `data/articles.json` and the issue's `trend-research` document. Reject anything under 5,000.
3. Write `articles/<slug>.html` with SEO title <60, meta description <155, OpenGraph, semantic H1/H2/H3, TL;DR, FAQ, JSON-LD `NewsArticle` + `FAQPage`, author/date, category badge, country tag and related articles.
4. Add the article to `data/articles.json` with `status: "published"`, and add its URL to `sitemap.xml` and `llms.txt`.
5. Validate JSON-LD (`python3 -c "import json,re;..."`), then push to `main`. Deployment is automatic.

## Cost

$0. Static files, GitHub Pages, no APIs, no databases, no paid tooling.
