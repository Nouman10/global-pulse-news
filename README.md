# Global Pulse News

$0-cost, fully static news portal for Qureshi Digital Studio. Hosted on GitHub Pages. Three categories: Crypto Market, Global Politics, Movies & TV Shows.

**Live:** https://nouman10.github.io/global-pulse-news/

## Hard editorial gate

Nothing is published unless its target keyword has a **verified 20,000+ monthly searches in the USA or UK**, or a Google Trends item explicitly labelled `20K+`, `50K+`, `100K+` or higher. Items labelled `100+`, `200+`, `500+`, `1,000+`, unlabelled breakouts, or unverifiable numbers are rejected. No estimates, no rounding up.

At launch (22 Nov 2026) the live Google Trends RSS feeds for `geo=US` and `geo=GB` contained **no item at or above 20K+**, so `data/articles.json` has zero published articles. Three fully built articles are held in `drafts/` and are disallowed in `robots.txt`.

## Layout

- `index.html` — portal home with category tabs and country pills.
- `assets/` — CSS and the client-side catalog renderer.
- `data/articles.json` — published catalog plus the staging manifest with gate evidence.
- `articles/` — published article pages (created on promotion).
- `drafts/` — gate-unverified article drafts, never indexed.
- `sitemap.xml`, `robots.txt`, `llms.txt` — Google + AI-search discovery files.
- `.nojekyll` — prevents Jekyll processing on GitHub Pages.

## Promotion checklist (run only after the gate is verified)

1. Confirm primary-source volume evidence for each draft and record it in `data/articles.json`.
2. Move `drafts/<slug>.html` → `articles/<slug>.html`.
3. Add the article to the `articles` array in `data/articles.json` with `status: "published"`; decrement `pendingCount`.
4. Add the article URL to `sitemap.xml` and `llms.txt`.
5. Validate JSON-LD with Google Rich Results Test, then push to `main` (Developer & Publisher owns `gh` pushes).

## Cost

$0. Static files, GitHub Pages, no APIs, no databases, no paid tooling.
