import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    image: "https://goxxii.com/wp-content/uploads/2025/04/blog-3-e1752675723126.jpg",
    title: "Dedicated Owner Operator Jobs",
    date: "Dec 22",
    slug: "/blog/dedicated-owner-operator-jobs",
  },
  {
    image: "https://goxxii.com/wp-content/uploads/2025/11/1014-1-scaled-e1766426043392.jpeg",
    title: "Local Jobs Near Chicago",
    date: "Dec 15",
    slug: "/blog/local-owner-operator-jobs",
  },
  {
    image: "https://goxxii.com/wp-content/uploads/2025/11/Tanker-owner-operator-jobs.png",
    title: "Insurance & Carriers Guide",
    date: "Dec 3",
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
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            Latest News
          </h2>
          <Link to="/blog" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 * index }}
              className="group"
            >
              <Link to={post.slug} className="block">
                <div className="img-hover-glow relative aspect-[3/2] rounded-lg border border-border mb-3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <time className="text-xs text-muted-foreground">{post.date}</time>
                <h3 className="font-display text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
