import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Upload, Sparkles, Send, Mic, Radio, ArrowRight, CheckCircle } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Your Profile", desc: "Tell us about your skills, experience, target roles, and salary expectations. Our AI builds a comprehensive career profile in under 5 minutes. The more detail you provide, the better your matches.", color: "from-primary/10" },
  { icon: Upload, title: "Upload Your Resume", desc: "Upload your existing resume (PDF, DOCX, or plain text) or create a brand new one from scratch using our AI-powered builder with dozens of professionally designed templates.", color: "from-success/10" },
  { icon: Sparkles, title: "AI Optimization", desc: "Our AI analyzes your resume against thousands of successful applications, rewrites weak sections, optimizes keywords for ATS systems, and ensures your resume stands out to human reviewers.", color: "from-warning/10" },
  { icon: Send, title: "Apply to Jobs Automatically", desc: "CareerCopilot finds and applies to perfectly matched jobs on your behalf. You can review and approve each application, or let our AI handle everything on autopilot — up to 100+ applications daily.", color: "from-info/10" },
  { icon: Mic, title: "Practice Interviews", desc: "Prepare with AI-generated interview questions tailored to your target roles. Get real-time feedback on content, delivery, structure, and even speaking pace — with week-over-week improvement tracking.", color: "from-destructive/10" },
  { icon: Radio, title: "Real-Time Interview Assist", desc: "During live video interviews, CareerCopilot provides discreet AI-powered suggestions, talking points, keyword prompts, and confidence metrics — completely invisible to your interviewer.", color: "from-primary/10" },
];

const HowItWorksPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    
    <section className="pt-32 pb-16 section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="container-wide text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Process</span>
          <h1 className="font-display text-display text-foreground mb-5 text-balance">
            How <span className="gradient-text">CareerCopilot</span> Works
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-[600px] mx-auto">
            From profile setup to job offer — here's your complete journey with our AI career platform.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="pb-24">
      <div className="container-narrow">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[39px] md:left-[55px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 via-primary/20 to-transparent" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative flex gap-6 md:gap-10 group"
              >
                <div className="relative z-10 flex-shrink-0 w-[80px] md:w-[112px] h-[80px] md:h-[112px] rounded-3xl bg-card border border-border/30 flex flex-col items-center justify-center shadow-card transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:shadow-glow group-hover:scale-105">
                  <span className="text-h2 font-bold text-primary group-hover:text-primary-foreground transition-colors duration-300">{i + 1}</span>
                </div>
                <div className="pt-3 md:pt-6 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="w-6 h-6 text-primary" />
                    <h3 className="font-display text-h2 text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-body-lg text-muted-foreground max-w-[600px] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container-wide text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-h1 text-foreground mb-5">Start Your Journey Today</h2>
          <p className="text-body-lg text-muted-foreground mb-8">Join 50,000+ professionals who've already transformed their career search.</p>
          <Button variant="hero" size="lg" className="px-10 py-6 rounded-xl text-base" asChild>
            <Link to="/signup">Get Started Free <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
          <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
            {["Free 14-day trial", "No credit card needed", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-success" /> {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default HowItWorksPage;
