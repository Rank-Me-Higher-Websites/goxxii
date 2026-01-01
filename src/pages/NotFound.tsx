import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
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
