import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Shield, ArrowRight, Sparkles } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Starter", monthly: 0, yearly: 0,
    desc: "Perfect for exploring the platform",
    features: { "AI Resume Reviews": "5/mo", "Job Matches": "10/day", "Interview Practice": "Basic", "Auto Apply": false, "Cover Letters": false, "Live Copilot": false, "Analytics": false, "Priority Support": false },
  },
  {
    name: "Pro", monthly: 29, yearly: 23, popular: true,
    desc: "Most popular for active job seekers",
    features: { "AI Resume Reviews": "Unlimited", "Job Matches": "Unlimited", "Interview Practice": "Full", "Auto Apply": "100/day", "Cover Letters": "Unlimited", "Live Copilot": false, "Analytics": "Full", "Priority Support": false },
  },
  {
    name: "Premium", monthly: 79, yearly: 63,
    desc: "For serious career professionals",
    features: { "AI Resume Reviews": "Unlimited", "Job Matches": "Unlimited", "Interview Practice": "Full + AI Coach", "Auto Apply": "Unlimited", "Cover Letters": "Unlimited", "Live Copilot": "Full Access", "Analytics": "Advanced", "Priority Support": "24/7" },
  },
  {
    name: "Enterprise", monthly: null, yearly: null,
    desc: "For teams and organizations",
    features: { "AI Resume Reviews": "Custom", "Job Matches": "Custom", "Interview Practice": "Custom", "Auto Apply": "Custom", "Cover Letters": "Custom", "Live Copilot": "Custom", "Analytics": "Custom + API", "Priority Support": "Dedicated" },
  },
];

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes, upgrade or downgrade instantly. Changes take effect immediately with prorated billing." },
  { q: "Is there a free trial?", a: "All paid plans include a 14-day free trial. No credit card required to start." },
  { q: "What's your refund policy?", a: "We offer a full 30-day money-back guarantee on all paid plans — no questions asked." },
  { q: "Do you offer student discounts?", a: "Yes! Students get 50% off all plans. Contact support with your .edu email to activate." },
  { q: "Can I use CareerCopilot for multiple job searches?", a: "Absolutely. You can create multiple profiles and target different roles simultaneously." },
];

const featureKeys = ["AI Resume Reviews", "Job Matches", "Interview Practice", "Auto Apply", "Cover Letters", "Live Copilot", "Analytics", "Priority Support"];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-8 section-padding relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="container-wide text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Pricing</span>
            <h1 className="font-display text-display text-foreground mb-5">
              Choose Your <span className="gradient-text">Plan</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8">Start free. Scale when you're ready.</p>

            <div className="inline-flex items-center p-1 rounded-full bg-card border border-border/40 shadow-inner-soft">
              <button
                onClick={() => setYearly(false)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-400 ${!yearly ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
              >Monthly</button>
              <button
                onClick={() => setYearly(true)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-400 ${yearly ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
              >Yearly <span className="text-xs ml-1 opacity-70">Save 20%</span></button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-16 px-4">
        <div className="container-wide grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1400px]">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`relative rounded-3xl p-7 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? "bg-primary text-primary-foreground shadow-glow-lg border-2 border-primary scale-[1.02]"
                  : "bg-card border border-border/30 shadow-card hover:shadow-card-hover"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-warning text-warning-foreground text-xs font-bold shadow-elevation-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </span>
              )}
              <h3 className="text-h3 mb-1">{plan.name}</h3>
              <p className={`text-sm mb-5 ${plan.popular ? "opacity-75" : "text-muted-foreground"}`}>{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                {plan.monthly !== null ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={yearly ? "y" : "m"}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="text-display-sm"
                      >
                        ${yearly ? plan.yearly : plan.monthly}
                      </motion.span>
                    </AnimatePresence>
                    <span className={`text-sm ${plan.popular ? "opacity-60" : "text-muted-foreground"}`}>/{yearly ? "mo" : "mo"}</span>
                  </>
                ) : (
                  <span className="text-h2">Custom</span>
                )}
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {Object.entries(plan.features).map(([key, val]) => (
                  <li key={key} className="flex items-center gap-2 text-sm">
                    {val ? (
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "" : "text-success"}`} />
                    ) : (
                      <X className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "opacity-30" : "text-muted-foreground/30"}`} />
                    )}
                    <span className={!val ? (plan.popular ? "opacity-30" : "text-muted-foreground/50") : ""}>
                      {key}{typeof val === "string" ? `: ${val}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "outline" : plan.monthly === null ? "outline" : "hero"}
                className={`w-full rounded-xl py-5 ${plan.popular ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary" : ""}`}
                asChild
              >
                <Link to="/signup">{plan.monthly === null ? "Contact Sales" : "Get Started"}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Money back */}
      <section className="pb-16 px-4">
        <div className="container-wide flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-card border border-border/30 shadow-elevation-1">
            <Shield className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-foreground">30-Day Money-Back Guarantee · No Questions Asked</span>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide max-w-[1100px]">
          <h2 className="font-display text-h1 text-foreground text-center mb-12">Full Feature Comparison</h2>
          <div className="bg-card rounded-2xl border border-border/30 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Feature</th>
                    {plans.map((p) => (
                      <th key={p.name} className={`p-4 text-sm font-semibold text-center ${p.popular ? "text-primary" : "text-foreground"}`}>
                        {p.name}
                        {p.popular && <span className="block text-xs text-primary/70 mt-0.5">⭐ Popular</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureKeys.map((key) => (
                    <tr key={key} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-sm text-foreground font-medium">{key}</td>
                      {plans.map((p) => {
                        const val = p.features[key as keyof typeof p.features];
                        return (
                          <td key={p.name} className="p-4 text-center text-sm">
                            {val === false ? (
                              <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                            ) : (
                              <span className={`${p.popular ? "text-primary font-medium" : "text-foreground"}`}>
                                {typeof val === "string" ? val : <Check className="w-4 h-4 text-success mx-auto" />}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-wide max-w-[700px]">
          <h2 className="font-display text-h1 text-foreground text-center mb-12">Pricing FAQ</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-2xl px-6 border border-border/30 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Pricing;
