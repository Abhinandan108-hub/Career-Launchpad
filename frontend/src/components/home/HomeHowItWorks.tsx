import { motion } from "framer-motion";
import { UserPlus, Upload, Sparkles, Send, Mic, Radio } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Profile", desc: "Set up your career profile with skills, experience, and target roles in under 5 minutes." },
  { icon: Upload, title: "Upload Resume", desc: "Upload your existing resume or build a new one from scratch with our AI-powered builder." },
  { icon: Sparkles, title: "AI Optimization", desc: "Our AI rewrites, formats, and optimizes your resume for ATS systems and human reviewers." },
  { icon: Send, title: "Auto Apply", desc: "CareerCopilot finds matched jobs and applies on your behalf — up to 100+ applications daily." },
  { icon: Mic, title: "Practice Interviews", desc: "Prepare with role-specific mock interviews and get detailed AI feedback on your answers." },
  { icon: Radio, title: "Real-Time Assist", desc: "During live interviews, receive discreet AI-powered talking points and keyword prompts." },
];

const HomeHowItWorks = () => (
  <section className="section-padding bg-muted/30 relative overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-30" />
    
    <div className="container-wide relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">How It Works</span>
        <h2 className="font-display text-h1 text-foreground mb-5">
          From Profile to <span className="gradient-text">Job Offer</span>
        </h2>
        <p className="text-body-lg text-muted-foreground max-w-[500px] mx-auto">
          Six simple steps. One powerful platform.
        </p>
      </motion.div>

      {/* Desktop timeline */}
      <div className="hidden lg:block relative">
        <div className="absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
        <div className="grid grid-cols-6 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative z-10 w-[88px] h-[88px] rounded-2xl bg-card border border-border/40 flex items-center justify-center mb-5 shadow-card transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:shadow-glow group-hover:scale-105 group-hover:-translate-y-1">
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-elevation-1 group-hover:bg-card group-hover:text-primary transition-all duration-300">
                  {i + 1}
                </span>
                <step.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h4 className="font-semibold text-foreground mb-1.5">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile vertical */}
      <div className="lg:hidden space-y-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-5 items-start"
          >
            <div className="relative flex-shrink-0 w-16 h-16 rounded-2xl bg-card border border-border/40 flex items-center justify-center shadow-card">
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <step.icon className="w-7 h-7 text-primary" />
            </div>
            <div className="pt-1">
              <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeHowItWorks;
