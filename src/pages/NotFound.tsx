import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
    // Add noindex meta tag to prevent search engines from indexing 404 pages
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center">
        <div className="container-custom text-center">
          <h1 className="text-8xl font-display font-bold text-gradient mb-4">404</h1>
          <h2 className="heading-section text-foreground mb-6">Page Not Found</h2>
          <p className="body-large mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
