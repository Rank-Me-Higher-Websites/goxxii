import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import dedicatedOwnerOperator from "@/assets/blog/dedicated-owner-operator.jpg";
import localOwnerOperator from "@/assets/blog/local-owner-operator.jpg";
import ownerOperatorGuide from "@/assets/blog/owner-operator-guide.png";

const blogPosts = [
  {
    image: dedicatedOwnerOperator,
    title: "Dedicated Owner Operator Jobs: Pros and Cons",
    excerpt: "Explore the advantages and challenges of dedicated owner operator positions in the trucking industry. Learn what to expect and how to make the most of dedicated lanes.",
    date: "December 22, 2025",
    readTime: "5 min read",
    slug: "/blog/dedicated-owner-operator-jobs",
    category: "Owner Operators",
  },
  {
    image: localOwnerOperator,
    title: "Local Owner Operator Jobs Near Me: Chicago Tips",
    excerpt: "Find the best local owner operator opportunities in the Chicago area. Insider tips on routes, rates, and building relationships with local shippers.",
    date: "December 15, 2025",
    readTime: "4 min read",
    slug: "/blog/local-owner-operator-jobs",
    category: "Local Jobs",
  },
  {
    image: ownerOperatorGuide,
    title: "Owner Operator Guide: Insurance, Jobs and Carriers",
    excerpt: "Everything you need to know about owner operator insurance requirements, finding the best jobs, and choosing the right carrier to partner with.",
    date: "December 3, 2025",
    readTime: "7 min read",
    slug: "/blog/owner-operator-guide",
    category: "Guides",
  },
];

const categories = ["All", "Owner Operators", "Company Drivers", "Local Jobs", "Guides", "Industry News"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-cyan-500/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
              XXII Century Blog
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Industry News & Insights
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Stay informed with the latest trucking industry news, career tips, and insights 
              for owner operators and company drivers.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background border-border"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-card/50">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="group"
                >
                  <Link to={post.slug} className="block">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-border">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest industry news and career tips delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-background"
              />
              <button className="h-12 px-6 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
