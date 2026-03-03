import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Mic, Radio, Lightbulb, Zap, AlertCircle, Activity, Clock, Volume2 } from "lucide-react";

const transcriptLines = [
  { speaker: "Interviewer", text: "Tell me about your experience with distributed systems and how you've handled scaling challenges.", time: "0:42" },
  { speaker: "You", text: "I've worked extensively with microservices architecture at my previous company, where we handled over 50 million requests daily...", time: "0:55" },
  { speaker: "Interviewer", text: "How did you handle service discovery and load balancing across different regions?", time: "1:23" },
  { speaker: "You", text: "We implemented a service mesh using Istio, which provided automatic service discovery, traffic management, and observability...", time: "1:38" },
  { speaker: "Interviewer", text: "What monitoring and alerting strategies did you put in place?", time: "2:10" },
];

const suggestions = [
  { type: "tip", icon: Lightbulb, text: "Mention your experience with Kubernetes orchestration and auto-scaling — it's directly relevant to their tech stack." },
  { type: "keyword", icon: Zap, text: "Keywords detected: microservices ✓, service mesh ✓, load balancing ✓, Istio ✓ — Great coverage!" },
  { type: "alert", icon: AlertCircle, text: "Speaking pace is slightly fast (165 WPM). Try to slow down — aim for 140 WPM." },
];

const InterviewCopilot = () => (
  <div className="min-h-screen bg-foreground text-background">
    <header className="h-14 bg-foreground/90 backdrop-blur-xl border-b border-background/[0.06] flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-background/60 hover:text-background hover:bg-background/[0.06]" asChild>
          <Link to="/dashboard"><ArrowLeft className="w-4 h-4 mr-1" /> Exit</Link>
        </Button>
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-destructive animate-pulse" />
          <span className="text-sm font-medium">Live Session</span>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <Mic className="w-4 h-4 text-success" />
          <span className="text-xs text-background/50">Mic Active</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-xs text-background/50">Recording</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-background/40" />
          <span className="text-sm font-mono text-background/40 tabular-nums">12:34</span>
        </div>
      </div>
    </header>

    <div className="flex flex-col md:flex-row h-[calc(100vh-56px)]">
      {/* Left — Transcript */}
      <div className="flex-1 border-b md:border-b-0 md:border-r border-background/[0.06] overflow-auto p-4 md:p-6">
        <h3 className="text-xs font-semibold text-background/40 uppercase tracking-[0.15em] mb-5">Live Transcript</h3>
        <div className="space-y-4">
          {transcriptLines.map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
              className={`p-4 rounded-2xl transition-all duration-300 hover:scale-[1.01] ${
                line.speaker === "You" ? "bg-primary/15 ml-4 sm:ml-6 border border-primary/10" : "bg-background/5 mr-4 sm:mr-6 border border-background/5"
              }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-semibold ${line.speaker === "You" ? "text-primary" : "text-background/40"}`}>{line.speaker}</span>
                <span className="text-xs text-background/25 font-mono">{line.time}</span>
              </div>
              <p className="text-sm text-background/85 leading-relaxed">{line.text}</p>
            </motion.div>
          ))}
          <div className="flex items-center gap-2 p-4">
            <div className="flex gap-1">
              {[0, 150, 300].map((d) => (
                <div key={d} className="w-1.5 h-1.5 rounded-full bg-success animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
            <span className="text-sm text-background/30">Listening...</span>
          </div>
        </div>
      </div>

      {/* Right — AI Panel */}
      <div className="w-full md:w-[380px] lg:w-[420px] overflow-auto p-4 md:p-6">
        <h3 className="text-xs font-semibold text-background/40 uppercase tracking-[0.15em] mb-5">AI Suggestions</h3>

        {/* Confidence Meter */}
        <div className="mb-6 p-4 rounded-2xl bg-background/5 border border-background/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-background/40 font-medium">Overall Confidence</span>
            <span className="text-sm font-bold text-success">78%</span>
          </div>
          <div className="w-full h-2.5 bg-background/[0.06] rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-warning to-success rounded-full" />
          </div>
        </div>

        {/* Speaking Pace */}
        <div className="mb-6 p-4 rounded-2xl bg-background/5 border border-background/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-background/40 font-medium flex items-center gap-1.5"><Volume2 className="w-3.5 h-3.5" /> Speaking Pace</span>
            <span className="text-sm font-bold text-warning">165 WPM</span>
          </div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full ${i < 7 ? "bg-primary/40" : "bg-background/[0.06]"}`} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-background/25 mt-1">
            <span>Slow</span><span>Optimal</span><span>Fast</span>
          </div>
        </div>

        <div className="space-y-3">
          {suggestions.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.2 }}
              className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${
                s.type === "tip" ? "bg-primary/8 border-primary/15" :
                s.type === "keyword" ? "bg-success/8 border-success/15" :
                "bg-warning/8 border-warning/15"
              }`}>
              <div className="flex items-start gap-3">
                <s.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  s.type === "tip" ? "text-primary" : s.type === "keyword" ? "text-success" : "text-warning"
                }`} />
                <p className="text-sm text-background/75 leading-relaxed">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Keywords */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold text-background/40 uppercase tracking-[0.15em] mb-3">Detected Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {["Microservices", "Kubernetes", "Service Mesh", "Load Balancing", "Istio", "Docker", "Monitoring"].map((kw) => (
              <span key={kw} className="px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-medium border border-primary/10 hover:bg-primary/20 transition-colors">{kw}</span>
            ))}
          </div>
        </div>

        {/* Cheat sheet */}
        <div className="mt-6 p-4 rounded-2xl bg-background/5 border border-background/5">
          <p className="text-xs text-background/40 font-medium mb-2">💡 Quick Cheat Sheet</p>
          <p className="text-sm text-background/60 leading-relaxed">
            For monitoring questions: mention Prometheus, Grafana, PagerDuty integration, SLOs/SLAs, and the 4 golden signals (latency, traffic, errors, saturation).
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default InterviewCopilot;
