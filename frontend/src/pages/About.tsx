import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Heart, Zap, Globe, Award, CheckCircle } from "lucide-react";

const values = [
  { icon: Users, title: "People First", desc: "Every feature we build starts with real job seekers' pain points — not vanity metrics." },
  { icon: Target, title: "Outcome Driven", desc: "We measure success by the number of offers landed, not features shipped." },
  { icon: Heart, title: "Radically Transparent", desc: "No hidden fees, no dark patterns. We succeed only when you succeed." },
  { icon: Globe, title: "Global Access", desc: "Available in 40+ countries with support for multi-language resumes and interviews." },
];

const team = [
  { name: "Aarav Mehta", role: "CEO & Co-Founder", avatar: "AM" },
  { name: "Sophie Chen", role: "CTO & Co-Founder", avatar: "SC" },
  { name: "Daniel Park", role: "Head of AI", avatar: "DP" },
  { name: "Maria Garcia", role: "Head of Design", avatar: "MG" },
  { name: "James Wilson", role: "Head of Growth", avatar: "JW" },
  { name: "Priya Sharma", role: "Head of Product", avatar: "PS" },
];

const milestones = [
  { year: "2023", event: "Founded in San Francisco" },
  { year: "2024", event: "Launched AI Resume Builder — 10K users in 30 days" },
  { year: "2025", event: "Launched Real-Time Interview Copilot — featured in TechCrunch" },
  { year: "2026", event: "50,000+ active users, 7,200+ interviews aced" },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.03] blur-[120px]" />
      <div className="container-wide text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">About Us</span>
          <h1 className="font-display text-display text-foreground mb-6 text-balance">
            We're Building the Future of{" "}
            <span className="gradient-text">Career Success</span>
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-[640px] mx-auto mb-10">
            CareerCopilot was born from a simple frustration — job searching shouldn't feel like a full-time job. We're here to change that with AI that works for you.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="hero" size="lg" className="px-8 py-5 rounded-xl" asChild>
              <Link to="/signup">Join Us <ArrowRight className="w-5 h-5 ml-1" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-5 rounded-xl border-border/60" asChild>
              <Link to="/features">See Features</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 border-y border-border/30 bg-muted/30">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "50K+", label: "Active Users" },
            { value: "7,200+", label: "Interviews Aced" },
            { value: "96%", label: "Success Rate" },
            { value: "40+", label: "Countries" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-h1 md:text-display-sm font-bold gradient-text mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Our Values</span>
          <h2 className="font-display text-h1 text-foreground mb-4">What Drives Us</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover p-7 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                <v.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container-narrow relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Our Journey</span>
          <h2 className="font-display text-h1 text-foreground mb-4">Milestones</h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:-translate-x-[1px]" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <p className="text-h3 font-bold text-primary">{m.year}</p>
                  <p className="text-muted-foreground">{m.event}</p>
                </div>
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-glow">
                  <Award className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="md:hidden flex-1">
                  <p className="text-h3 font-bold text-primary">{m.year}</p>
                  <p className="text-muted-foreground text-sm">{m.event}</p>
                </div>
                <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Our Team</span>
          <h2 className="font-display text-h1 text-foreground mb-4">Meet the People Behind CareerCopilot</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-card-hover p-6 text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-lg mx-auto mb-4 group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                {t.avatar}
              </div>
              <h3 className="font-semibold text-foreground">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-muted/30">
      <div className="container-wide text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-h1 text-foreground mb-5">Join Our Mission</h2>
          <p className="text-body-lg text-muted-foreground mb-8 max-w-[500px] mx-auto">Help us make career success accessible to everyone, everywhere.</p>
          <div className="flex justify-center gap-4">
            <Button variant="hero" size="lg" className="px-10 py-6 rounded-xl text-base" asChild>
              <Link to="/signup">Get Started Free <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </div>
          <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
            {["Free 14-day trial", "No credit card needed", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-success" /> {t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
