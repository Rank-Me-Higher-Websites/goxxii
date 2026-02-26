import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Search, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SEOContentSection } from "@/components/sections/SEOContentSection";
import heroBackground from "@/assets/heroes/truck-white-dock.png";

import dedicatedOwnerOperator from "@/assets/blog/dedicated-owner-operator.jpg";
import localOwnerOperator from "@/assets/blog/local-owner-operator.jpg";
import ownerOperatorGuide from "@/assets/blog/owner-operator-guide.png";
import dryVanJobs from "@/assets/blog/dry-van-jobs.jpg";
import negotiateLinehaul from "@/assets/blog/negotiate-linehaul.jpg";
import chicagoTips from "@/assets/blog/chicago-tips.jpg";
import localJobsHome from "@/assets/blog/local-jobs-home.png";
import careerChicago from "@/assets/blog/career-chicago.jpg";
import bestTruckingCompany from "@/assets/blog/best-trucking-company.jpg";
import chicagoJobs from "@/assets/blog/chicago-jobs.jpg";
import succeedWithoutBurnout from "@/assets/blog/succeed-without-burnout.jpg";
import becomingOwnerOperator from "@/assets/blog/becoming-owner-operator.jpg";
import ooJobsChicagoKnow from "@/assets/blog/oo-jobs-chicago-know.jpg";
import hiringOoChicago from "@/assets/blog/hiring-oo-chicago.jpg";

const blogPosts = [
  {
    image: negotiateLinehaul,
    title: "Owner Operator Truck Driver Jobs: How to Negotiate Better Linehaul Rates",
    excerpt: "If you've ever hung up the phone after booking a load and thought, 'Wait… should I have asked for more?'—you're not alone.",
    date: "January 19, 2026",
    readTime: "10 min read",
    slug: "owner-operator-truck-driver-jobs-negotiate",
    category: "Owner Operators",
  },
  {
    image: localOwnerOperator,
    title: "Local Owner Operator Jobs Near Me: What to Ask Before You Sign a Contract",
    excerpt: "Scrolling through listings for local owner operator jobs near me can feel exciting at first. But the real deal isn't in the listing, it's in the contract.",
    date: "January 5, 2026",
    readTime: "12 min read",
    slug: "local-owner-operator-jobs",
    category: "Local Jobs",
  },
  {
    image: dedicatedOwnerOperator,
    title: "Dedicated Owner Operator Jobs: Pros and Cons",
    excerpt: "If you're an owner operator, you've probably heard the term dedicated lanes thrown around more times than you can count.",
    date: "December 22, 2025",
    readTime: "8 min read",
    slug: "dedicated-owner-operator-jobs",
    category: "Owner Operators",
  },
  {
    image: chicagoTips,
    title: "Local Owner Operator Jobs Near Me: Chicago Tips",
    excerpt: "If you've ever typed 'local owner operator jobs near me' into a search bar and found yourself overwhelmed by options—especially in Chicago—you're not alone.",
    date: "December 15, 2025",
    readTime: "10 min read",
    slug: "local-owner-operator-jobs-chicago-tips",
    category: "Local Jobs",
  },
  {
    image: ownerOperatorGuide,
    title: "Owner Operator Guide: Insurance, Jobs and Carriers",
    excerpt: "Everything you need to know about owner operator insurance requirements, finding the best jobs, and choosing the right carrier.",
    date: "December 3, 2025",
    readTime: "12 min read",
    slug: "owner-operator-guide",
    category: "Guides",
  },
  {
    image: dryVanJobs,
    title: "Dry Van Owner Operator Jobs: What to Know",
    excerpt: "If you've been thinking about becoming a dry van owner operator, you're not alone. More drivers than ever are exploring this path.",
    date: "November 21, 2025",
    readTime: "10 min read",
    slug: "dry-van-owner-operator-jobs",
    category: "Owner Operators",
  },
  {
    image: localJobsHome,
    title: "Local Owner Operator Jobs That Pay and Let You Stay Home",
    excerpt: "Local owner operator jobs offer a rare balance between solid income and personal time—without sacrificing the moments that matter most.",
    date: "November 13, 2025",
    readTime: "10 min read",
    slug: "local-owner-operator-jobs-home",
    category: "Local Jobs",
  },
  {
    image: careerChicago,
    title: "How Regional Trucking Affects Owner Operator Opportunities",
    excerpt: "Regional trucking demand in 2025 directly shapes your earnings and schedule. This guide covers demand drivers, lane comparisons, and tech strategies.",
    date: "November 6, 2025",
    readTime: "15 min read",
    slug: "owner-operator-opportunities-2025",
    category: "Owner Operators",
  },
  {
    image: bestTruckingCompany,
    title: "How to Choose the Best Owner Operator Trucking Company",
    excerpt: "Choosing the right company to partner with can make or break your success. Learn what to look for in contracts, pay, and support.",
    date: "October 16, 2025",
    readTime: "10 min read",
    slug: "best-owner-operator-trucking-company",
    category: "Owner Operators",
  },
  {
    image: chicagoJobs,
    title: "How to Land the Best Owner Operator Jobs in Chicago",
    excerpt: "Chicago is the beating heart of America's supply chain. Learn how to compare pay, identify the best routes, and spot a reliable trucking company.",
    date: "October 6, 2025",
    readTime: "8 min read",
    slug: "owner-operator-jobs-chicago",
    category: "Owner Operators",
  },
  {
    image: succeedWithoutBurnout,
    title: "How to Succeed in Owner Operator Position Without Burning Out",
    excerpt: "The freedom to be your own boss is great, but the challenges can be overwhelming. Learn how to thrive without sacrificing your health or happiness.",
    date: "September 18, 2025",
    readTime: "10 min read",
    slug: "succeed-without-burnout",
    category: "Guides",
  },
  {
    image: careerChicago,
    title: "How To Build a Truck Driving Career in Chicago",
    excerpt: "From securing licenses to finding reliable freight, this step-by-step guide covers everything you need to build an owner operator career in Chicago.",
    date: "September 8, 2025",
    readTime: "10 min read",
    slug: "truck-driving-career-chicago",
    category: "Local Jobs",
  },
];

const categories = ["All", "Owner Operators", "Local Jobs", "Guides"];
const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <SEOHead 
        title={SEO_CONTENT.blog.title}
        description={SEO_CONTENT.blog.description}
        keywords={SEO_CONTENT.blog.keywords}
        canonicalPath="/blog"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background pointer-events-none" />
        <div className="container-custom relative z-10">
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
            <p className="text-muted-foreground text-lg mb-4">
              Explore our trucking blog for CDL driver tips, owner operator insights, and pro-level career advice. 
              Stay updated with expert guidance on navigating the road and maximizing your earnings potential.
            </p>
            <p className="text-muted-foreground mb-8">
              Whether you're considering <Link to="/owner-operators" className="text-primary hover:underline">becoming an independent owner operator</Link> or exploring <Link to="/company-drivers" className="text-primary hover:underline">company driver positions</Link>, our articles help you make informed decisions about your <Link to="/careers" className="text-primary hover:underline">trucking career path</Link>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply To Drive
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+17735725012" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </Button>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
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
                onClick={() => handleCategoryChange(category)}
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
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="group"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
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

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-2 mt-12"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-border bg-background hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "border border-border bg-background hover:bg-card text-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-border bg-background hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Results count */}
              <p className="text-center text-muted-foreground text-sm mt-6">
                Showing {startIndex + 1}-{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} articles
              </p>
            </>
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
              Stay Updated on Trucking Industry Trends
            </h2>
            <p className="text-muted-foreground mb-4">
              Get the latest industry news and career tips delivered directly to your inbox. From market rate updates to driver wellness advice, we cover what matters most to professional truckers.
            </p>
            <p className="text-muted-foreground mb-6">
              Ready to start driving? Explore our <Link to="/owner-operators" className="text-primary hover:underline">owner operator program</Link> with 90% revenue share or check out <Link to="/company-drivers" className="text-primary hover:underline">company driver jobs</Link> starting at 63 CPM.
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

      <SEOContentSection pageKey="blog" />
    </Layout>
  );
};

export default Blog;
