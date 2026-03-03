import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Sparkles, Zap, Bug, RefreshCw } from "lucide-react";

const entries = [
  {
    version: "v3.2.0", date: "Feb 28, 2026", type: "feature" as const,
    title: "Real-Time Interview Copilot v2",
    desc: "Completely redesigned copilot with faster response time (<200ms), multi-language support, and a new confidence scoring algorithm.",
    items: ["50% faster AI suggestions", "Support for 12 languages", "New confidence meter with granular scoring", "Dark mode enhancements"],
  },
  {
    version: "v3.1.0", date: "Feb 15, 2026", type: "improvement" as const,
    title: "Resume Builder Upgrade",
    desc: "New professional templates, drag-and-drop section reordering, and one-click PDF export with ATS optimization.",
    items: ["8 new resume templates", "Drag-and-drop sections", "Improved ATS scoring algorithm"],
  },
  {
    version: "v3.0.2", date: "Feb 5, 2026", type: "fix" as const,
    title: "Bug Fixes & Performance",
    desc: "Resolved issues with auto-apply rate limiting and improved overall dashboard performance.",
    items: ["Fixed auto-apply cooldown bug", "Dashboard loads 40% faster", "Mobile sidebar responsiveness fix"],
  },
  {
    version: "v3.0.0", date: "Jan 20, 2026", type: "feature" as const,
    title: "CareerCopilot 3.0 Launch",
    desc: "Major platform redesign with new AI engine, redesigned dashboard, and Learning Hub launch.",
    items: ["Complete UI/UX redesign", "New GPT-4o powered AI engine", "Learning & Reading Hub", "Analytics Dashboard v2"],
  },
  {
    version: "v2.8.0", date: "Dec 10, 2025", type: "improvement" as const,
    title: "Interview Practice Overhaul",
    desc: "Revamped interview practice with video recording, STAR method coaching, and week-over-week analytics.",
    items: ["Video recording support", "STAR method detection", "Performance analytics over time"],
  },
];

const typeConfig = {
  feature: { icon: Sparkles, label: "New Feature", bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  improvement: { icon: RefreshCw, label: "Improvement", bg: "bg-success/10", text: "text-success", border: "border-success/20" },
  fix: { icon: Bug, label: "Bug Fix", bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" },
};

const Changelog = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="pt-32 section-padding">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Changelog</span>
          <h1 className="font-display text-display text-foreground mb-5 text-balance">
            What's <span className="gradient-text">New</span>
          </h1>
          <p className="text-body-lg text-muted-foreground">Stay updated with the latest features, improvements, and fixes.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 via-border/30 to-transparent" />

          <div className="space-y-12">
            {entries.map((entry, i) => {
              const config = typeConfig[entry.type];
              return (
                <motion.div
                  key={entry.version}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-card border-2 border-border/40 flex items-center justify-center shadow-card z-10">
                    <config.icon className={`w-4 h-4 ${config.text}`} />
                  </div>
                  <div className="glass-card-hover p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text} border ${config.border}`}>
                        {config.label}
                      </span>
                      <span className="text-sm font-mono text-primary font-semibold">{entry.version}</span>
                      <span className="text-xs text-muted-foreground">{entry.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{entry.desc}</p>
                    <ul className="space-y-1.5">
                      {entry.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                          <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Changelog;
