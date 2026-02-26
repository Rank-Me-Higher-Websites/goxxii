import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPostsData } from "@/data/blogPostsData";
import React from "react";

// Parse inline markdown: **bold**, _italic_, [link](url)
const renderInlineContent = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  // Combined regex for bold, italic, and links
  const regex = /(\*\*.*?\*\*)|(_[^_]+_)|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold **text**
      parts.push(
        <strong key={match.index} className="text-foreground font-semibold">
          {match[1].replace(/\*\*/g, "")}
        </strong>
      );
    } else if (match[2]) {
      // Italic _text_
      parts.push(
        <em key={match.index}>
          {match[2].slice(1, -1)}
        </em>
      );
    } else if (match[3] && match[4]) {
      // Link [text](url)
      const url = match[4];
      const isInternal = url.startsWith("/");
      if (isInternal) {
        parts.push(
          <Link key={match.index} to={url} className="text-primary hover:underline">
            {match[3]}
          </Link>
        );
      } else {
        parts.push(
          <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {match[3]}
          </a>
        );
      }
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

// Render content array with support for headings, images, lists, bold, italic, links
const renderContent = (content: string[]) => {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < content.length) {
    const line = content[i];

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">
          {renderInlineContent(line.replace("## ", ""))}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
          {renderInlineContent(line.replace("### ", ""))}
        </h3>
      );
      i++;
      continue;
    }

    // Image ![alt](url)
    if (line.startsWith("![")) {
      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        elements.push(
          <div key={i} className="my-8 rounded-xl overflow-hidden border border-border">
            <img
              src={imgMatch[2]}
              alt={imgMatch[1]}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        );
        i++;
        continue;
      }
    }

    // Unordered list items (collect consecutive - items)
    if (line.startsWith("- ")) {
      const listItems: { index: number; text: string }[] = [];
      while (i < content.length && content[i].startsWith("- ")) {
        listItems.push({ index: i, text: content[i].replace("- ", "") });
        i++;
      }
      elements.push(
        <ul key={`ul-${listItems[0].index}`} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
          {listItems.map((item) => (
            <li key={item.index} className="leading-relaxed">
              {renderInlineContent(item.text)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list items (collect consecutive numbered items)
    if (/^\d+\.\s/.test(line)) {
      const listItems: { index: number; text: string }[] = [];
      while (i < content.length && /^\d+\.\s/.test(content[i])) {
        listItems.push({ index: i, text: content[i].replace(/^\d+\.\s/, "") });
        i++;
      }
      elements.push(
        <ol key={`ol-${listItems[0].index}`} className="list-decimal list-inside space-y-2 my-4 text-muted-foreground">
          {listItems.map((item) => (
            <li key={item.index} className="leading-relaxed">
              {renderInlineContent(item.text)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // "Also Read" callout
    if (line.startsWith("_Also Read:")) {
      elements.push(
        <div key={i} className="my-8 p-4 bg-card rounded-lg border border-border italic text-muted-foreground">
          {renderInlineContent(line)}
        </div>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-muted-foreground leading-relaxed mb-4">
        {renderInlineContent(line)}
      </p>
    );
    i++;
  }

  return elements;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsData[slug] : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = Object.entries(blogPostsData)
    .filter(([key]) => key !== slug)
    .slice(0, 2)
    .map(([key, value]) => ({ slug: key, ...value }));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <div className="max-w-4xl">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                {post.category}
              </span>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              {renderContent(post.content)}

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 rounded-2xl border border-border">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join XXII Century and discover opportunities that match your goals. We're always looking for passionate people to be a part of our team.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/owner-operators">Owner Operators</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/company-drivers">Company Drivers</Link>
                  </Button>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Share & Save */}
              <div className="p-6 bg-card rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-4">Share This Article</h4>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="flex-1">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Related Posts */}
              <div className="p-6 bg-card rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-4">Related Articles</h4>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-2">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h5 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h5>
                      <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="p-6 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-2">Stay Updated</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest industry news delivered to your inbox.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/contact">Subscribe</Link>
                </Button>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
