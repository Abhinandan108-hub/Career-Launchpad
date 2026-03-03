import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Send, FileText, PenTool, Mic, Radio, BarChart3, Search, BookOpen,
  ArrowRight, Check, Sparkles
} from "lucide-react";

const features = [
  {
    icon: Send, title: "Auto Apply System",
    desc: "Stop wasting hours on manual applications. Our AI finds the best-matched roles, tailors your resume for each one, and submits applications while you sleep. Review, approve, or let it run on autopilot.",
    benefits: ["Apply to 100+ jobs daily on autopilot", "AI-customized resume per application", "Smart matching algorithm with 99.8% accuracy", "Full application tracking dashboard"],
    mockup: "auto-apply",
  },
  {
    icon: FileText, title: "AI Resume Builder",
    desc: "Build resumes that pass every ATS scanner and impress every human reviewer. Choose from professional templates, get AI content suggestions, and tailor your resume for any role with one click.",
    benefits: ["ATS optimization score up to 99%", "Multiple professional templates", "AI-powered content suggestions", "One-click tailoring for any job"],
    mockup: "resume",
  },
  {
    icon: PenTool, title: "Cover Letter Generator",
    desc: "No more staring at a blank page. Generate role-specific, personalized cover letters that highlight your most relevant experience and match the company's voice and values.",
    benefits: ["Role-specific personalization", "Adjustable tone and style", "Company research built-in", "Multiple format templates"],
    mockup: "cover-letter",
  },
  {
    icon: Mic, title: "Interview Practice Mode",
    desc: "Practice makes perfect. Get AI-coached with industry-specific mock interviews, real-time feedback on your answers, detailed scoring, and week-over-week improvement tracking.",
    benefits: ["Industry-specific question banks", "Real-time AI scoring & feedback", "STAR method coaching", "Performance analytics over time"],
    mockup: "practice",
  },
  {
    icon: Radio, title: "Real-Time Interview Copilot",
    desc: "The ultimate edge in live interviews. Get discreet AI-powered suggestions, talking points, and keyword prompts in real time — completely invisible to your interviewer.",
    benefits: ["Live speech-to-text transcription", "Real-time answer suggestions", "Keyword detection & highlights", "Confidence and pace metrics"],
    mockup: "copilot",
  },
  {
    icon: Search, title: "Smart Job Matching",
    desc: "Let AI do the job hunting. Our matching engine analyzes your skills, experience, salary expectations, and career goals to surface the perfect opportunities — updated every hour.",
    benefits: ["Skill-based intelligent matching", "Salary range insights", "Company culture fit scoring", "Growth opportunity analysis"],
    mockup: "matching",
  },
  {
    icon: BarChart3, title: "Analytics Dashboard",
    desc: "Know exactly where you stand. Track application response rates, interview conversion, resume performance, and market trends — all visualized in one beautiful dashboard.",
    benefits: ["Application funnel analytics", "Response rate tracking", "Interview performance trends", "Market salary benchmarks"],
    mockup: "analytics",
  },
  {
    icon: BookOpen, title: "Learning & Reading Hub",
    desc: "Stay sharp with curated career content. From interview preparation guides to industry trend reports — everything you need to stay ahead in your job search.",
    benefits: ["Expert-written career guides", "Interview prep cheat sheets", "Industry trend reports", "Salary negotiation playbooks"],
    mockup: "learning",
  },
];

const Features = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    
    {/* Hero */}
    <section className="pt-32 pb-16 section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="container-wide text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Product Features</span>
          <h1 className="font-display text-display text-foreground mb-5 text-balance">
            Powerful <span className="gradient-text">AI Tools</span> for Your Career
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-[580px] mx-auto mb-8">
            Eight intelligent tools working together to automate, optimize, and accelerate every step of your job search.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="hero" size="lg" className="px-8 py-5 rounded-xl" asChild>
              <Link to="/signup">Try Free for 14 Days <ArrowRight className="w-5 h-5 ml-1" /></Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Feature blocks — alternating layout */}
    <section className="pb-24">
      <div className="container-wide space-y-[100px] lg:space-y-[140px]">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "" : ""}`}
          >
            {/* Text */}
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6 shadow-elevation-1">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display text-h1 text-foreground mb-4">{f.title}</h2>
              <p className="text-body-lg text-muted-foreground mb-7 max-w-[520px] leading-relaxed">{f.desc}</p>
              <ul className="space-y-3 mb-8">
                {f.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground text-sm">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" className="rounded-xl" asChild>
                <Link to="/signup">
                  Try {f.title.split(" ")[0]} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>

            {/* Mockup */}
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="w-full max-w-[560px] mx-auto perspective-container">
                <div className="tilt-card rounded-2xl overflow-hidden bg-card border border-border/30 shadow-card-lg">
                  {/* Window chrome */}
                  <div className="px-4 py-3 bg-muted/30 border-b border-border/20 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-warning/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-success/40" />
                    </div>
                    <div className="flex-1 h-5 rounded bg-muted/50 max-w-[200px]" />
                  </div>
                  {/* Mockup content */}
                  <div className="p-6 min-h-[300px] flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                        <f.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="h-4 w-32 bg-muted rounded" />
                        <div className="h-3 w-20 bg-muted/60 rounded mt-1" />
                      </div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-full bg-muted/40 rounded" />
                      <div className="h-3 w-4/5 bg-muted/40 rounded" />
                      <div className="h-3 w-3/5 bg-muted/40 rounded" />
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <div className="h-8 px-4 rounded-lg bg-primary/10 flex items-center">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="h-8 w-24 rounded-lg bg-muted/50" />
                      <div className="h-8 w-20 rounded-lg bg-muted/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-muted/30">
      <div className="container-wide text-center">
        <h2 className="font-display text-h1 text-foreground mb-5">Ready to get started?</h2>
        <p className="text-body-lg text-muted-foreground mb-8">Try all features free for 14 days. No credit card required.</p>
        <Button variant="hero" size="lg" className="px-10 py-6 rounded-xl text-base" asChild>
          <Link to="/signup">Start Free Trial <ArrowRight className="w-5 h-5 ml-2" /></Link>
        </Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default Features;
