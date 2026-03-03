import { motion } from "framer-motion";
import {
  Send, FileText, PenTool, Mic, Radio, BarChart3, Search, BookOpen,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Send, title: "Auto Apply", desc: "Automatically apply to hundreds of perfectly matched jobs daily. AI customizes each application for maximum callback.", color: "from-primary/10 to-primary/5", link: "/features" },
  { icon: FileText, title: "AI Resume Builder", desc: "Create ATS-optimized resumes with smart templates. Tailored for every role with one click.", color: "from-success/10 to-success/5", link: "/dashboard/resume" },
  { icon: PenTool, title: "Cover Letter Generator", desc: "Generate personalized, compelling cover letters in seconds — not hours. Role-specific and tone-perfect.", color: "from-warning/10 to-warning/5", link: "/features" },
  { icon: Mic, title: "Interview Practice", desc: "Practice with AI mock interviews. Get scored on content, delivery, and structure in real time.", color: "from-info/10 to-info/5", link: "/dashboard/interview-practice" },
  { icon: Radio, title: "Live Interview Copilot", desc: "Real-time AI suggestions during actual interviews. Discreet, fast, and personalized to your background.", color: "from-destructive/10 to-destructive/5", link: "/dashboard/interview-live" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track applications, response rates, interview scores, and market insights — all in one dashboard.", color: "from-primary/10 to-primary/5", link: "/dashboard" },
  { icon: Search, title: "Smart Job Matching", desc: "AI analyzes your skills, goals, and preferences to find the perfect roles. Updated in real time.", color: "from-success/10 to-success/5", link: "/features" },
  { icon: BookOpen, title: "Learning & Reading Hub", desc: "Curated career guides, interview prep articles, and industry insights to keep you ahead.", color: "from-warning/10 to-warning/5", link: "/blog" },
];

const FeatureGrid = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[100px]" />
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/[0.015] blur-[80px]" />
    
    <div className="container-wide">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Features</span>
        <h2 className="font-display text-h1 md:text-display-sm text-foreground mb-5 text-balance">
          Everything You Need to{" "}
          <span className="gradient-text">Land Your Dream Job</span>
        </h2>
        <p className="text-body-lg text-muted-foreground max-w-[580px] mx-auto">
          One platform, eight powerful tools. From resume to offer — we've got every step covered.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <Link
              to={f.link}
              className="block glass-card-hover p-6 group relative overflow-hidden h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow">
                  <f.icon className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;
