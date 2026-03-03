import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

const HomeCTA = () => (
  <section className="section-padding">
    <div className="container-wide">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[32px] gradient-btn p-12 md:p-20"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary-foreground/[0.04] -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-primary-foreground/[0.04] translate-y-1/2 -translate-x-1/3 blur-3xl" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full border border-primary-foreground/5 animate-float" />
        <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full border border-primary-foreground/5 animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 max-w-[600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 mb-8 backdrop-blur-sm border border-primary-foreground/10"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">No credit card required</span>
          </motion.div>

          <h2 className="font-display text-h1 md:text-display-sm mb-5 text-balance">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-body-lg opacity-80 mb-10">
            Join 50,000+ professionals who transformed their career with CareerCopilot.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-base rounded-xl font-semibold shadow-elevation-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg group"
              asChild
            >
              <Link to="/signup">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-70">
            {["Free 14-day trial", "No credit card", "Cancel anytime"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HomeCTA;
