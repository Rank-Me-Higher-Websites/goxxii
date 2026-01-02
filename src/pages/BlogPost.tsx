import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import dedicatedOwnerOperator from "@/assets/blog/dedicated-owner-operator.jpg";
import localOwnerOperator from "@/assets/blog/local-owner-operator.jpg";
import ownerOperatorGuide from "@/assets/blog/owner-operator-guide.png";

const blogPostsData: Record<string, {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  content: string[];
}> = {
  "dedicated-owner-operator-jobs": {
    image: dedicatedOwnerOperator,
    title: "Dedicated Owner Operator Jobs: Pros and Cons",
    excerpt: "Explore the advantages and challenges of dedicated owner operator positions in the trucking industry.",
    date: "December 22, 2025",
    readTime: "5 min read",
    category: "Owner Operators",
    author: "XXII Century Team",
    content: [
      "Dedicated owner operator jobs have become increasingly popular in the trucking industry, offering a unique blend of stability and independence. Understanding the pros and cons of these positions can help you make an informed decision about your career path.",
      
      "## What Are Dedicated Owner Operator Jobs?",
      "Dedicated owner operator positions involve working with a specific shipper or on designated routes consistently. Unlike general freight, dedicated lanes provide predictable schedules and familiar territory, making them attractive to many experienced drivers.",
      
      "## The Advantages of Dedicated Lanes",
      "**Predictable Income:** With consistent routes and regular freight, you can better forecast your earnings. This stability helps with financial planning and reduces the stress of wondering where your next load will come from.",
      
      "**Home Time:** Many dedicated positions offer better home time since routes are planned in advance. You'll know when you'll be home, making it easier to maintain family relationships and personal commitments.",
      
      "**Relationship Building:** Working with the same shippers allows you to build strong relationships. This can lead to preferential treatment, easier loading/unloading processes, and potential for negotiating better rates over time.",
      
      "**Reduced Deadhead Miles:** Dedicated routes are typically optimized, meaning less time driving empty. This translates to better fuel efficiency and higher net income.",
      
      "## The Challenges to Consider",
      "**Less Flexibility:** Dedicated routes mean less freedom to choose your loads. If you value variety and spontaneity in your work, dedicated positions might feel restrictive.",
      
      "**Rate Limitations:** While income is stable, dedicated positions sometimes offer lower per-mile rates compared to spot market opportunities. During peak seasons, you might miss out on higher-paying freight.",
      
      "**Dependency on One Customer:** If your dedicated shipper reduces volume or changes carriers, you could face sudden income disruption. Diversification isn't an option in purely dedicated roles.",
      
      "## Is Dedicated Right for You?",
      "The best choice depends on your priorities. If you value stability, predictable schedules, and regular home time, dedicated positions are excellent. If you prefer maximum earning potential and variety, the open road might suit you better.",
      
      "At XXII Century, we offer both dedicated and OTR opportunities, allowing you to find the perfect fit for your lifestyle and goals. Contact us today to explore your options."
    ]
  },
  "local-owner-operator-jobs": {
    image: localOwnerOperator,
    title: "Local Owner Operator Jobs Near Me: Chicago Tips",
    excerpt: "Find the best local owner operator opportunities in the Chicago area with insider tips.",
    date: "December 15, 2025",
    readTime: "4 min read",
    category: "Local Jobs",
    author: "XXII Century Team",
    content: [
      "Chicago's strategic location as a major logistics hub makes it one of the best cities for local owner operators. With access to major interstates, rail yards, and a diverse manufacturing base, the opportunities are abundant for those who know where to look.",
      
      "## Why Chicago is Ideal for Local Owner Operators",
      "The Windy City sits at the crossroads of American commerce. I-90, I-94, I-55, and I-80 all converge here, creating endless opportunities for short-haul and regional freight. The city's diverse economy—from manufacturing to food distribution—means consistent demand year-round.",
      
      "## Top Industries for Local Freight",
      "**Food and Beverage:** Chicago is home to major food distributors and processors. Local runs to restaurants, grocery chains, and food service companies provide steady work with predictable schedules.",
      
      "**Manufacturing:** The surrounding areas of Illinois, Indiana, and Wisconsin have strong manufacturing sectors. Moving raw materials and finished goods between facilities creates reliable opportunities.",
      
      "**Retail and E-commerce:** With multiple Amazon fulfillment centers and major retail distribution hubs, last-mile and regional delivery work continues to grow.",
      
      "## Tips for Finding the Best Local Jobs",
      "**Network Locally:** Attend trucking industry events and join local trucking associations. Personal connections often lead to the best opportunities before they're publicly advertised.",
      
      "**Build Your Reputation:** In local trucking, word travels fast. Reliability and professionalism will earn you referrals and repeat business.",
      
      "**Understand Your Costs:** Chicago traffic can eat into your profits if you're not careful. Factor in fuel costs, tolls, and time when evaluating opportunities.",
      
      "**Consider Dedicated Accounts:** Many local shippers prefer working with the same drivers. Dedicated local accounts offer stability while keeping you home every night.",
      
      "## Getting Started with XXII Century",
      "At XXII Century, we have strong relationships with Chicago-area shippers looking for reliable owner operators. Our local opportunities offer competitive rates, consistent freight, and the support you need to succeed. Reach out today to learn about current openings in the Chicago area."
    ]
  },
  "owner-operator-guide": {
    image: ownerOperatorGuide,
    title: "Owner Operator Guide: Insurance, Jobs and Carriers",
    excerpt: "Everything you need to know about insurance, finding jobs, and choosing the right carrier.",
    date: "December 3, 2025",
    readTime: "7 min read",
    category: "Guides",
    author: "XXII Century Team",
    content: [
      "Becoming an owner operator is a significant step in your trucking career. This comprehensive guide covers the essential aspects of insurance requirements, finding quality jobs, and selecting the right carrier to partner with.",
      
      "## Understanding Owner Operator Insurance",
      "Insurance is one of the most critical—and often confusing—aspects of being an owner operator. Here's what you need to know:",
      
      "**Primary Liability Insurance:** This is mandatory and typically provided by the carrier you're leased to. It covers damage you might cause to others in an accident. Minimum requirements vary by state but typically range from $750,000 to $1 million.",
      
      "**Physical Damage Insurance:** This covers damage to your own truck. Unlike liability, you're responsible for obtaining this coverage. Shop around for competitive rates and consider your deductible carefully.",
      
      "**Bobtail Insurance:** If you ever operate your truck without a trailer (bobtailing), you need this coverage. It protects you during non-dispatch periods.",
      
      "**Occupational Accident Insurance:** Since you're not an employee, you won't have workers' compensation. Occupational accident insurance fills this gap, covering medical expenses and lost income if you're injured on the job.",
      
      "## Finding Quality Owner Operator Jobs",
      "Not all jobs are created equal. Here's how to find opportunities that maximize your income and quality of life:",
      
      "**Evaluate the Freight:** Look for consistent lanes with minimal deadhead miles. Understand the commodity—some freight is harder on your equipment than others.",
      
      "**Understand the Payment Terms:** How often will you be paid? What percentage or rate per mile will you receive? Are there any deductions you should know about?",
      
      "**Consider the Support:** Does the carrier offer fuel discounts, maintenance support, or other benefits? These can significantly impact your bottom line.",
      
      "## Choosing the Right Carrier",
      "The carrier you partner with can make or break your success as an owner operator. Consider these factors:",
      
      "**Reputation:** Research the carrier online. Check reviews from current and former owner operators. Look for patterns in complaints or praise.",
      
      "**Communication:** How responsive is the carrier? Good communication is essential for resolving issues quickly and keeping you moving.",
      
      "**Technology:** Modern carriers invest in technology that makes your job easier—mobile apps, ELD integration, and efficient dispatch systems.",
      
      "**Financial Stability:** Partner with carriers that have a solid financial foundation. This ensures reliable payments and long-term opportunities.",
      
      "## Why Partner with XXII Century?",
      "At XXII Century, we've built our reputation on treating owner operators as true partners. We offer competitive rates, consistent freight, modern technology, and a support team that's always available. Whether you're an experienced owner operator or just starting out, we're here to help you succeed. Contact us today to learn more about our opportunities."
    ]
  }
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
              {post.content.map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <h3 key={index} className="font-display text-xl font-semibold text-foreground mt-6 mb-3">
                      {paragraph.replace(/\*\*/g, "")}
                    </h3>
                  );
                }
                // Handle paragraphs with bold text
                const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {parts.map((part, partIndex) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <strong key={partIndex} className="text-foreground font-semibold">
                            {part.replace(/\*\*/g, "")}
                          </strong>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              })}

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 rounded-2xl border border-border">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join XXII Century and discover opportunities that match your goals.
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
