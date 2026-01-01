import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    image: "https://goxxii.com/wp-content/uploads/2025/04/blog-3-e1752675723126.jpg",
    title: "Dedicated Owner Operator Jobs: Pros and Cons",
    date: "December 22, 2025",
    slug: "/blog/dedicated-owner-operator-jobs",
  },
  {
    image: "https://goxxii.com/wp-content/uploads/2025/11/1014-1-scaled-e1766426043392.jpeg",
    title: "Local Owner Operator Jobs Near Me: Chicago Tips",
    date: "December 15, 2025",
    slug: "/blog/local-owner-operator-jobs",
  },
  {
    image: "https://goxxii.com/wp-content/uploads/2025/11/Tanker-owner-operator-jobs.png",
    title: "Owner Operator Guide: Insurance, Jobs and Carriers",
    date: "December 3, 2025",
    slug: "/blog/owner-operator-guide",
  },
];

export const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-card relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-section text-foreground">
            Latest News
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-6">
                <time className="text-sm text-muted-foreground">{post.date}</time>
                <h3 className="font-display text-xl font-bold text-foreground mt-2 mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <Link
                  to={post.slug}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/blog">View More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
