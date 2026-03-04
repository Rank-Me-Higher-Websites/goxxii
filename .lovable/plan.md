

## SEO Audit: Meta Titles, Descriptions & Keywords

### Current Status

All 11 static pages have SEOHead with title, description, keywords, and canonical. Dynamic pages (BlogPost, CareerDetail, OwnerOperatorState) generate SEO dynamically. The 404 page has no SEO tags (correct behavior).

### Assessment

The existing SEO content is **solid overall** — titles are within Google's 50-60 char sweet spot, descriptions are under 160 chars, and keywords target relevant terms. However, there are some improvements worth making:

### Recommended Upgrades

| Page | Issue | Proposed Fix |
|------|-------|-------------|
| **Home** | Title doesn't mention location | Add "Chicago" or "Illinois" to title for local intent |
| **Owner Operators** | No brand name in title | Append "| XXII Century" for brand recognition |
| **Company Drivers** | No brand or location in title | Append "| XXII Century Trucking" |
| **About** | Description could be stronger CTA | Add "Join our team" or "Apply now" language |
| **Careers** | Keywords missing "hiring now", "apply online" | Add high-intent action keywords |
| **Blog** | Missing brand in title | Append "| XXII Century" |
| **Contact** | Good as-is | No change needed |
| **BlogPost** (dynamic) | No keywords passed | Pass post-specific keywords from blogPostsData |
| **CareerDetail** (dynamic) | Description is just truncated intro text | Craft a proper meta description template |
| **NotFound** | No SEO tags | Add noindex meta tag to prevent indexing |
| **All pages** | Keywords could use long-tail additions | Add 2025-relevant terms like "trucking jobs 2025", "best owner operator company" |

### Technical Changes

1. **`src/components/SEOHead.tsx`** — Update `SEO_CONTENT` entries with improved titles/descriptions/keywords
2. **`src/pages/CareerDetail.tsx`** — Build a proper meta description template instead of truncating intro
3. **`src/pages/BlogPost.tsx`** — Add keywords prop (requires adding keyword field to blogPostsData or generating from tags)
4. **`src/pages/NotFound.tsx`** — Add SEOHead with noindex or add a robots noindex meta tag
5. **`src/data/blogPostsData.ts`** — Optionally add a `keywords` field per blog post for richer SEO

### Scope
~5 files edited, mostly string updates. No structural or layout changes.

