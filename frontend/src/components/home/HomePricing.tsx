import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Shield, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    monthlyPrice: "Free",
    yearlyPrice: "Free",
    desc: "Get started with basic tools",
    features: ["5 AI Resume Reviews", "10 Job Matches/day", "Basic Interview Practice", "Community Access"],
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: "$29",
    yearlyPrice: "$23",
    desc: "Everything to land your dream job",
    features: ["Unlimited Resume Building", "Auto Apply (100/day)", "Full Interview Practice", "Cover Letter Generator", "Analytics Dashboard", "Priority Email Support"],
    popular: true,
  },
  {
    name: "Premium",
    monthlyPrice: "$79",
    yearlyPrice: "$63",
    desc: "For serious career professionals",
    features: ["Everything in Pro", "Real-Time Interview Copilot", "Unlimited Auto Apply", "LinkedIn Profile Optimizer", "Dedicated Career Coach", "24/7 Priority Support"],
    popular: false,
  },
];

const HomePricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Pricing</span>
          <h2 className="font-display text-h1 text-foreground mb-5">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8">Start free. Upgrade when you're ready.</p>

          {/* Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-card border border-border/40 shadow-inner-soft">
            <button
              onClick={() => setYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-400 ${
                !yearly ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-400 ${
                yearly ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly <span className="text-xs ml-1 opacity-70">Save 20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? "bg-primary text-primary-foreground shadow-glow-lg border-2 border-primary scale-[1.03]"
                  : "bg-card border border-border/40 shadow-card hover:shadow-card-hover"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-warning text-warning-foreground text-xs font-bold shadow-elevation-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </span>
              )}
              <h3 className="text-h3 mb-1">{plan.name}</h3>
              <p className={`text-sm mb-5 ${plan.popular ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{plan.desc}</p>
              
              <div className="flex items-baseline gap-1 mb-7">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={yearly ? "yearly" : "monthly"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-display-sm"
                  >
                    {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </motion.span>
                </AnimatePresence>
                {plan.monthlyPrice !== "Free" && (
                  <span className={`text-sm ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>/mo</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-primary-foreground" : "text-success"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "outline" : "hero"}
                className={`w-full rounded-xl py-5 ${
                  plan.popular
                    ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                    : ""
                }`}
                asChild
              >
                <Link to="/signup">{plan.monthlyPrice === "Free" ? "Get Started" : "Start Free Trial"}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Money back badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card border border-border/40 shadow-elevation-1">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-foreground">30-Day Money-Back Guarantee</span>
          </div>
        </motion.div>

        <div className="text-center mt-6">
          <Link to="/pricing" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline transition-all">
            View full comparison <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePricing;
