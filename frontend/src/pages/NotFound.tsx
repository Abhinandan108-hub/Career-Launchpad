import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 px-6"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-accent border border-primary/10 mb-6 shadow-elevation-2">
            <span className="text-display font-bold gradient-text">404</span>
          </div>
        </motion.div>

        <h1 className="font-display text-h1 text-foreground mb-4">Page Not Found</h1>
        <p className="text-body-lg text-muted-foreground mb-10 max-w-[440px] mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="hero" size="lg" className="px-8 py-5 rounded-xl" asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-5 rounded-xl border-border/60" asChild>
            <Link to="/features">
              <Search className="w-4 h-4 mr-2" /> Explore Features
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
