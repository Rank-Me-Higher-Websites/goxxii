import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import localOwnerOperator from "@/assets/blog/local-owner-operator.jpg";
import ownerOperatorGuide from "@/assets/xxii-new-1.jpg";

const blogPosts = [
  {
    image: localOwnerOperator,
    title: "Local Owner Operator Jobs Near Me: What to Ask Before You Sign a Contract",
    excerpt: "Scrolling through listings for local owner operator jobs near me can feel exciting at first. But the real deal isn't in the listing, it's in the contract.",
    date: "January 5, 2026",
    readTime: "12 min read",
    slug: "/blog/local-owner-operator-jobs",
  },
  {
    image: ownerOperatorGuide,
    title: "Owner Operator Guide: Insurance, Jobs and Carriers",
    excerpt: "Everything you need to know about insurance, finding jobs, and choosing the right carrier.",
    date: "December 3, 2025",
    readTime: "7 min read",
    slug: "/blog/owner-operator-guide",
  },
];

export const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
        >
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-2 block">
              Industry Insights
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Latest News
            </h2>
          </div>
          <Link 
            to="/blog" 
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-2 font-semibold group"
          >
            View All Articles 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
