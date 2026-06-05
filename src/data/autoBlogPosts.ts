// Build-time loader for auto-generated blog posts.
//
// Reads frontmatter + body from src/content/blog/*.md and exposes the
// same shape as blogPostsData so the existing Blog.tsx + BlogPost.tsx
// renderers consume both sources transparently.
//
// Posts here are produced by the n8n blog-automation workflow.
// Manually-curated posts continue to live in blogPostsData.ts.

import type { BlogPostData } from "./blogPostsData";

type RawFrontmatter = Record<string, string>;

function parseFrontmatter(raw: string): { fm: RawFrontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { fm: {}, body: raw };
  const fm: RawFrontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*?)\s*$/);
    if (!kv) continue;
    const key = kv[1];
    let value = kv[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    fm[key] = value;
  }
  return { fm, body: match[2] };
}

function parseBody(body: string): string[] {
  const blocks = body.trim().split(/\r?\n\s*\r?\n/);
  const out: string[] = [];
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    // Lists: emit each line as its own entry so the renderer can collapse
    // consecutive list items into one <ul>/<ol>.
    if (/^-\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      for (const line of trimmed.split(/\r?\n/)) {
        const t = line.trim();
        if (t) out.push(t);
      }
    } else {
      out.push(trimmed);
    }
  }
  return out;
}

const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const autoBlogPosts: Record<string, BlogPostData> = (() => {
  const result: Record<string, BlogPostData> = {};
  for (const [path, raw] of Object.entries(modules)) {
    const { fm, body } = parseFrontmatter(raw);
    const filenameMatch = path.match(/([^/]+)\.md$/);
    const slug = fm.slug || filenameMatch?.[1];
    if (!slug) continue;
    result[slug] = {
      image: fm.image || "/placeholder.svg",
      title: fm.title || slug,
      excerpt: fm.excerpt || "",
      date: fm.date || "",
      readTime: fm.readTime || "5 min read",
      category: fm.category || "Guides",
      author: fm.author || "XXII Century Team",
      content: parseBody(body),
      // When the body looks like HTML (auto-posts produced in HTML mode),
      // pass it through to BlogPost.tsx for dangerouslySetInnerHTML rendering.
      htmlBody: /<[a-z][\s\S]*?>/i.test(body) ? body.trim() : undefined,
    };
  }
  return result;
})();

// Listing-shape array, sorted newest-first by date string.
// Blog.tsx merges this into its blogPosts[] for the index page.
export const autoBlogPostsList = Object.entries(autoBlogPosts)
  .map(([slug, data]) => ({
    image: data.image,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    readTime: data.readTime,
    slug,
    category: data.category,
  }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));
