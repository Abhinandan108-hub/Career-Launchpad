import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Star, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const stats = [
  { value: 96, suffix: "%", label: "Interview Success Rate" },
  { value: 50, suffix: "K+", label: "Professionals Helped" },
  { value: 7200, suffix: "+", label: "Interviews Aced" },
];

const roles = ["Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Marketing Lead", "DevOps Engineer"];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[920px] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute top-20 right-0 w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-[120px] animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
      {/* Animated gradient mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] opacity-[0.02]" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(210, 88%, 40%), transparent 50%), radial-gradient(ellipse at 70% 50%, hsl(280, 70%, 50%), transparent 50%)" }} />

      <div className="container-wide relative z-10 pt-28 pb-16 lg:pt-0 lg:pb-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/10 mb-8 shadow-elevation-1"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">Trusted by 50,000+ job seekers</span>
              <span className="flex items-center gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                ))}
              </span>
            </motion.div>

            <h1 className="font-display text-[40px] sm:text-[52px] lg:text-display leading-[1.05] text-foreground mb-6 text-balance text-shadow">
              Land Your Dream{" "}
              <span className="gradient-text relative">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="inline-block"
                >
                  {roles[roleIndex]}
                </motion.span>
              </span>{" "}
              Role — Faster.
            </h1>

            <p className="text-body-lg text-muted-foreground mb-10 max-w-[520px] leading-relaxed">
              CareerCopilot finds high-match roles, tailors your resume, auto-applies, and coaches you live — so you move from submit to offer, fast.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="hero" size="lg" className="px-8 py-6 text-base rounded-xl ripple group" asChild>
                <Link to="/signup">
                  Start For Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base rounded-xl border-border/60 hover:border-primary/30 hover:bg-accent/50 gap-2 transition-all duration-300"
                asChild
              >
                <Link to="/features">
                  <Play className="w-4 h-4 text-primary" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Social proof row */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2.5">
                {["S", "M", "P", "A", "R"].map((letter, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-card flex items-center justify-center text-xs font-bold text-primary shadow-elevation-1"
                    style={{ zIndex: 5 - i }}
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">4.9/5.0</span>
                <span className="text-muted-foreground"> · Rated by 29,100+ users</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Interactive demo mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative perspective-container hidden lg:block"
          >
            {/* Main card */}
            <div className="relative tilt-card rounded-3xl overflow-hidden bg-card border border-border/40 shadow-card-lg">
              <div className="bg-foreground/[0.03] border-b border-border/30 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60 hover:bg-destructive transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-warning/60 hover:bg-warning transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-success/60 hover:bg-success transition-colors cursor-pointer" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">CareerCopilot — Live Session</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-success font-medium">Live</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">R</div>
                  <div className="bg-muted/60 rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Recruiter</p>
                    <p className="text-sm text-foreground">Can you explain your understanding of microservices architecture? What are its advantages?</p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="ml-auto max-w-[90%] p-4 rounded-2xl bg-accent border border-primary/10 shadow-elevation-1"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-primary">AI Suggestion</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    <span className="font-semibold">Situation:</span> Worked on high-traffic e-commerce platform. <span className="font-semibold">Key points:</span> Independent deployment, fault isolation, scalability per service...
                  </p>
                </motion.div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-primary/10 rounded-2xl rounded-tr-md px-4 py-3 max-w-[85%]">
                    <p className="text-xs font-medium text-primary mb-1">You</p>
                    <p className="text-sm text-foreground">Microservices is essentially about breaking down a large application into smaller, independent services...</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">Y</div>
                </div>

                <div className="flex items-center gap-2 pl-11">
                  <div className="flex gap-1">
                    {[0, 150, 300].map((d) => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">listening to response...</span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -left-6 top-1/4 glass-card p-3 px-4 flex items-center gap-2.5 shadow-elevation-2 animate-bounce-subtle"
            >
              <CheckCircle2 className="w-5 h-5 text-success" />
              <div>
                <p className="text-xs font-semibold text-foreground">Resume Score</p>
                <p className="text-sm font-bold text-success">95/100</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
              className="absolute -right-4 bottom-1/3 glass-card p-3 px-4 flex items-center gap-2.5 shadow-elevation-2 animate-bounce-subtle"
              style={{ animationDelay: "2s" }}
            >
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs font-semibold text-foreground">Auto Applied</p>
                <p className="text-sm font-bold text-primary">587 Jobs</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-[700px] mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-4 rounded-2xl bg-card/50 border border-border/20 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-500 hover:-translate-y-1"
            >
              <p className="text-h2 sm:text-h1 font-bold text-primary mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
