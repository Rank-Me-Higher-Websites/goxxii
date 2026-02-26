

## Plan: Professional robots.txt

Replace the current basic `robots.txt` with a comprehensive, professional version that:

1. **Explicitly allows all major search engine bots** — Googlebot, Bingbot, Yandex, DuckDuckBot, Baidu, etc.
2. **Explicitly allows AI crawlers** — GPTBot (ChatGPT/OpenAI), Google-Extended (Gemini/Bard), ChatGPT-User, Claude-Web, Anthropic, PerplexityBot, Meta-ExternalAgent, Bytespider (TikTok), Applebot-Extended, cohere-ai, and others.
3. **Explicitly allows social media bots** — Twitterbot, facebookexternalhit, LinkedInBot, Pinterestbot, Slackbot, WhatsApp.
4. **Blocks known bad/spam bots** — AhrefsBot, SemrushBot, MJ12bot, DotBot, etc. (these scrape without value).
5. **Adds a Sitemap directive** pointing to `https://goxxii.com/sitemap.xml`.
6. **Catch-all rule** — `User-agent: * / Allow: /` at the end to allow any unlisted bot.

### File change

- **`public/robots.txt`** — Rewrite with the full professional ruleset described above.

One file, straightforward replacement.

